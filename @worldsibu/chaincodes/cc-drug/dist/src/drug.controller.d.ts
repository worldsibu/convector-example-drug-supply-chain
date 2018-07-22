import { ConvectorController } from '@worldsibu/convector-core-controller';
import { Drug } from './drug.model';
export declare class DrugController extends ConvectorController {
    create(drug: Drug): Promise<void>;
    transfer(drugId: string, to: string, reportHash: any, reportUrl: any): Promise<void>;
}
