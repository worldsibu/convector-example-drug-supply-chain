import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Drug } from '../src/drug.model';
import { ControllerAdapter } from '@worldsibu/convector-core-adapter';


export class DrugControllerClient extends ConvectorController {
  private name = 'drug';

  constructor(private adapter: ControllerAdapter) {
    super()
  }

  
  public async create(
    
    id: string,
    
    name: string,
    
    created: number
  ) {

          return await this.adapter.invoke(this.name, 'create', undefined, id, name, created);
        
  }

  
  public async transfer(
    
    drugId: string,
    
    to: string,
    
    reportHash,
    
    reportUrl,
    
    modified: number
  ) {

          return await this.adapter.invoke(this.name, 'transfer', undefined, drugId, to, reportHash, reportUrl, modified);
        
  }
}
