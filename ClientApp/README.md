# webspec3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## How to use i18n

If you add some text which should be translatable (e.g. `<p>Hello party people!</p>`), please add the translation in both of the .json-Files (found under `assets/i18n`) and replace the text in the template with a pipe, that navigates to your translation (`<p>{{ 'HERE_GOES_THE_PATH.TO_YOUR_TRANSLATION' | translate }}</p>`). 

To keep the .json-Files easily understandable and reproducable, please put your translations under a section, that is named after the component your translated text is located in (written in uppercase and "-" replaced with an underscore).

## Angular Material

To get nice results quickly and without writing endless complicated css-Files, we can use [Angular Material](https://material.angular.io/). You can search the website for various [Components](https://material.angular.io/components/categories) and just add the needed imports in the `material.module.ts` file, which is imported into the `app.module.ts`.

Just take a look at the API-Section of each component to determine which module you need to import.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
