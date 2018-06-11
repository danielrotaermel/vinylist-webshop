import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from "@angular/router";
import { AdminDataComponent } from './admin-data.component';

import { ApiService } from '../../api.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class AdminDataService {

  constructor(private apiService : ApiService){
      
  }
  
  public all_users(){
      return this.apiService.get_users();
  }

}