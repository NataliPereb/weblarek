import { IProduct } from "../../types/index";
import { EventEmitter } from "../base/Events";

export class CatalogModel {
    private items: IProduct[];
    private selectedProduct: IProduct | null;
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.items = [];
        this.selectedProduct = null;
        this.events = events;
    }

    setItems(products: IProduct[]): void {
        this.items = products;
        this.events.emit("catalogUpdate", this.items);
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getProduct(id: string): IProduct | undefined {
        return this.items.find((item) => item.id === id);
    }

    setSelectedProduct(product: IProduct): void {
        this.selectedProduct = product;
        this.events.emit("selectedProductUpdate", product);
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}
