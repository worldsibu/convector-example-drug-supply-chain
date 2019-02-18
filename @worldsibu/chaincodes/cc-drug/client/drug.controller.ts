import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Drug } from '../src/drug.model';
import { Participant } from '@worldsibu/convector-example-dsc-cc-participant';
import { History } from '@worldsibu/convector-core-model';
import { ControllerAdapter } from '@worldsibu/convector-core-adapter';


export class DrugControllerClient extends ConvectorController {
  public name = 'drug';

  constructor(public adapter: ControllerAdapter, public user?: string) {
    super()
  }

  
  public async create(
    
    id: string,
    
    name: string,
    
    owner: string,
    
    created: number
  ) {

          return await this.adapter.invoke(this.name, 'create', this.user, id, name, owner, created);
        
  }

  
  public async transfer(
    
    drugId: string,
    
    to: string,
    
    reportHash,
    
    reportUrl,
    
    modified: number
  ) {

          return await this.adapter.invoke(this.name, 'transfer', this.user, drugId, to, reportHash, reportUrl, modified);
        
  }

  
  public async getHistory(
    
    drugId: string
  ): Promise<History<Drug>[]> {

          return await this.adapter.invoke(this.name, 'getHistory', this.user, drugId);
        
  }
}
