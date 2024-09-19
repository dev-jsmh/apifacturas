import { BillDetailEntity } from "./BillDetailEntity";
import { BillEntity } from "./BillEntity";
import { ProductEntity } from "./ProductEntity";




export class ClientEntity {

    public id?: number;
    public names?: string;
    public lastnames?: string;
    public bills?: BillEntity[];

}
