import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from "@angular/router";
import { UserDataComponent } from './user-data.component';

import { ApiService } from '../../api.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class UserDataService {
  private instances: {[key: string]: UserDataComponent} = {};
  
  constructor(private apiService : ApiService){

  }

}