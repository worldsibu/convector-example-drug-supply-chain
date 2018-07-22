import { ConvectorController } from '@worldsibu/convector-core-controller';
import { Drug } from '../src/drug.model';
import { ControllerAdapter } from '@worldsibu/convector-core-adapter';
export declare class DrugControllerClient extends ConvectorController {
    private adapter;
    private name;
    constructor(adapter: ControllerAdapter);
    create(drug: Drug): Promise<void>;
    transfer(drugId: string, to: string, reportHash: any, reportUrl: any): Promise<void>;
}
