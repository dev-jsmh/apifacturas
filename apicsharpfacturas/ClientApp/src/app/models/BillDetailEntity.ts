import { BillEntity } from "./BillEntity";
import { ProductEntity } from "./ProductEntity";



export class BillDetailEntity{

    public id?: number;
    public BillEntity?: BillEntity;
    public ProductEntity?: ProductEntity;
    public quantity?: number;
    public unitValue?: number;
    public totalValue?: number;

}