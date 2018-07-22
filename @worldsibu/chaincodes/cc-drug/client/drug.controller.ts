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
    
    name: string
  ) {
    await this.adapter.invoke(this.name, 'create', id, name);
  }

  
  public async transfer(
    
    drugId: string,
    
    to: string,
    
    reportHash,
    
    reportUrl
  ) {
    await this.adapter.invoke(this.name, 'transfer', drugId, to, reportHash, reportUrl);
  }
}
