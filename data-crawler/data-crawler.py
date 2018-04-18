#Author: Daniel Rotärmel

import logging
import csv
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urldefrag, urljoin
from urllib.request import urlretrieve
from collections import deque
from bs4 import BeautifulSoup
import pprint
import os, errno
import pickle

class SeleniumCrawler(object):
 
    def __init__(self, base_url, whitelist, exclusion_list, output_dir='/crawled-data', output_file='example.csv', start_url=None, limit=1, headless=True, log_level=logging.INFO, logfile='crawler.log'):
        
        logging.basicConfig(filename=logfile,level=log_level)

        assert isinstance(exclusion_list, list), 'exclusion list - needs to be a list'

        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument('headless')

        self.browser = webdriver.Chrome(chrome_options=options) #Initiate chromedriver

        self.base = base_url #URL/Domain to only stay on one Website
 
        self.start = start_url if start_url else base_url #URL where we start crawling
 
        self.whitelist = whitelist #List of URL patterns we want to include

        self.exclusions = exclusion_list  #List of URL patterns we want to exclude
 
        self.crawled_urls = []  #List to keep track of URLs we have already visited
 
        self.url_queue = deque([self.start])  #Add the start URL to our list of URLs to crawl
 
        self.output_file = output_file

        self.crawling_limit = limit

        self.output_dir = output_dir

        try:
            os.makedirs(self.output_dir)
        except OSError as e:
            if e.errno != errno.EEXIST:
                raise

    def tearDown(self):
        self.browser.quit()
        logging.info('teared down webdriver')

    def get_page(self, url):
        try:
            self.browser.get(url)
            if 'de/artikel' in url:
                myElem = WebDriverWait(self.browser, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'div.picture'))) # wait for page to finish loading
            if 'de/artikel' not in url:
                myElem = WebDriverWait(self.browser, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.picture'))) # wait for page to finish loading
            return self.browser.page_source
        except Exception as e:
            logging.exception(e)
            return

    def get_soup(self, html):
        if html is not None:
            soup = BeautifulSoup(html, 'lxml')
            return soup
        else:
            return

    def get_links(self, soup):

        for link in soup.find_all('a', href=True): #all links which have a href element
            link = link['href'] #href element of the link
            logging.debug('found link:'+ link)
            if any(e in link for e in self.exclusions): #Check if the link matches our exclusion list
                logging.debug('exluding:' + link)
                continue #stop processing this link
            if all(re.match(re.compile(e), link) for e in self.whitelist): #Check if the link matches our whitelist
                logging.debug('matches whitelist:'+ link)
                pass #continue processing
            else:
                logging.debug('not matching whitelist:'+ link)
                continue #stop processing this link
            url = urljoin(self.base, urldefrag(link)[0]) #resolve relative links
            logging.debug('resolved link:'+ url)
            if url not in self.url_queue and url not in self.crawled_urls: #Check if link is in queue or already crawled
                if url.startswith(self.base): #If the URL belongs to the same domain
                    self.url_queue.append(url) #Add the URL to our queue
                    logging.info('queued:' + link)

    def read_fact(self ,table_row):
        logging.debug('fact:' + str(table_row))
        key = table_row.find('td', {'class': 'title'}).get_text().strip().replace(':','')
        value = table_row.find('td', {'class': 'value'}).get_text().strip().replace(':','')
        return key, value

    def parse_facts(self, facts_soup):
        logging.debug('all facts:' + str(facts_soup))
        facts_map = {}
        facts_soup=facts_soup[0].find_all('tr')
        for elem in facts_soup:
            k,v = self.read_fact(elem)
            facts_map[k] = v
        return facts_map

    def parse_tracklist(self, tracklist_soup):
        logging.debug('tracklist:' + tracklist_soup)
        tracklist_array = []
        tracklist_soup = tracklist_soup[0].find_all('div', {'class': 'track'})
        for track in tracklist_soup:
            position = track.find('span', {'class': 'position'}).get_text().strip().replace('\n','')
            name = track.find('span', {'class': 'name'}).get_text().strip().replace('\n','')
            tracklist_array.append({'position': position, 'name': name})
        return tracklist_array


    def get_data(self, soup):
        data = {}

        #extract data
        try:
            data['facts'] = self.parse_facts(soup.select('#content > div.items_detail.responsive_l > div.column.right > div.flap.facts > div.content > table > tbody'))
        except Exception as e:
            logging.exception(e)
            pass
        try:
            data['artist'] = soup.select('#content > div.items_detail.responsive_l > div.column.right > div.headline > div > h1 > div.upper')[0].get_text().strip()
        except Exception as e:
            logging.exception(e)
            pass
        try:
            data['title'] = soup.select('#content > div.items_detail.responsive_l > div.column.right > div.headline > div > h1 > div.lower')[0].get_text().strip()
        except Exception as e:
            logging.exception(e)
            pass
        try:
            data['short_description'] = soup.select('#content > div.items_detail.responsive_l > div.column.right > div.music_format')[0].get_text().strip()
        except Exception as e:
            logging.exception(e)
            pass
        try:
            data['price'] = float(soup.select('#content > div.items_detail.responsive_l > div.column.right > div.price > span')[0].get_text().replace('€','').replace(',','.').strip())
        except Exception as e:
            logging.exception(e)
            pass
        try:
            data['article_description'] = soup.select('#content > div.items_detail.responsive_l > div.column.right > div.flap.description > div.content')[0].get_text().strip()
        except Exception as e:
            logging.exception(e)
            pass
        try:
            data['picture_src'] = soup.find("meta", {"property" : "og:image"})['content']
        except Exception as e:
            print(e)
            logging.exception(e)
            pass
        try:
            data['picture_alt'] = soup.select('#content > div.items_detail.responsive_l > div.column.left > div.picture > div.main > img')[0]['alt']
        except Exception as e:
            logging.exception(e)
            pass
        try:
            data['tracklist'] = self.parse_tracklist(soup.select('#content > div.items_detail.responsive_l > div.column.left > div.flap.tracklist > div.content'))
        except Exception as e:
            logging.exception(e)
            pass
        
        # transform data
        try: 
            data['item_id'] = int(data['facts']['Artikel-Nr'])
        except Exception as e:
            logging.exception(e)
            pass
        try: 
            data['label'] = data['facts']['Label']
        except Exception as e:
            logging.exception(e)
            pass
        try: 
            data['catalog_nr'] = data['facts']['Katalog-Nr']
        except Exception as e:
            logging.exception(e)
            pass
        try: 
            data['weight'] = data['facts']['Gewicht']
        except Exception as e:
            logging.exception(e)
            pass
        try: 
            data['format'] = data['facts']['Format']
        except Exception as e:
            logging.exception(e)
            pass
        try: 
            data['genre'] = data['facts']['Genre']
        except Exception as e:
            logging.exception(e)
            pass
        try: 
            data['pressung'] = data['facts']['Pressung']
        except Exception as e:
            logging.exception(e)
            pass
        try: 
            data['release-date'] = int(data['facts']['Release Date'])
        except Exception as e:
            logging.exception(e)
            pass
        try: 
            data['style'] = data['facts']['Style']
        except Exception as e:
            logging.exception(e)
            pass
        try: 
            data['condition'] = data['facts']['Zustand']
        except Exception as e:
            logging.exception(e)
            pass
            
        data.pop('facts', None)

        # add additional info data
        if 'price' in data.keys(): 
            data['price_currency'] = '€'

        # cleanup data
        if len(data) <= 10:
            data = {}
        
        # assert data is valid
        if 'picture_src' not in data.keys() :
            data = {}
        if 'item_id' not in data.keys():
            data = {}

        return data

    def dowload_img(self, src, id, dest_dir):
        # download the image
        destination = dest_dir + str(id) + ".jpg"
        urlretrieve(src, destination)

    def csv_output(self, url, title):
        output = self.output_dir + self.output_file
        with open(output, 'a', encoding='utf-8') as outputfile:
            writer = csv.writer(outputfile)
            writer.writerow([url, title])

    def run_crawler(self):
        crawled_counter = 0
        while len(self.url_queue) and self.crawling_limit != crawled_counter: #If we have URLs to crawl - we crawl
            current_url = self.url_queue.popleft() #grab a URL from the left of the list
            logging.info('processing:'+ current_url)
            self.crawled_urls.append(current_url) #add this URL to our crawled list
            html = self.get_page(current_url) 
            if self.browser.current_url != current_url: #if end URL is differs from requested URL - add URL to crawled list
                self.crawled_urls.append(current_url)
            soup = self.get_soup(html)
            if soup is not None:  #if we have soup - parse dowload image and write to our csv file
                crawled_counter += 1
                self.get_links(soup)
                data = self.get_data(soup)
                if bool(data):
                    self.dowload_img(data['picture_src'], data['item_id'], self.output_dir)
                    logging.info('saved image:'+ data['picture_src'])
                    self.csv_output(current_url, data)
                    logging.info('wrote data to csv:'+ current_url)
                    logging.debug('crawled data:'+ str(data))
                else:
                    logging.info('no data to write:' + current_url)

                #pp = pprint.PrettyPrinter(indent=4)
                #pp.pprint(data)


def main():
    seleniumCrawler = SeleniumCrawler(base_url='https://www.hhv.de',
                                  output_dir='crawled-data/',
                                  whitelist=['/shop/de/artikel'],
                                  #start_url='https://www.hhv.de/shop/de/vinyl-cd-tape/p:WEagQL', #all
                                  #start_url='https://www.hhv.de/shop/de/vinyl-cd-tape/p:dpDnCv', #pricey
                                  start_url='https://www.hhv.de/shop/de/suche-flume/p:OqHUIa', #flume
                                  output_file='data.csv',
                                  exclusion_list=[],
                                  limit=-1,
                                  headless=False
                                  )
    seleniumCrawler.run_crawler()
    seleniumCrawler.tearDown()

if __name__ == '__main__':
   main()




