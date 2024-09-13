import { ClientEntity } from "./ClientEntity";
import { BillDetailEntity } from "./BillDetailEntity";



export class BillEntity{

    public id?: number; 
    public client?:  ClientEntity;
    public subTotal?: number;
    public discount?: number;
    public totalValue?: number; 
    public details?: BillDetailEntity[];
}