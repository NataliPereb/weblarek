import { IProduct } from "../../types/index";

export class CatalogModel {
    private _items: IProduct[];
    private _selectedProduct: IProduct | null;

    constructor() {
        this._items = [];
        this._selectedProduct = null;
    }

    setItems(products: IProduct[]): void {
        this._items = products;
    }

    getItems(): IProduct[] {
        return this._items;
    }

    getProduct(id: string): IProduct | undefined {
        return this._items.find((item) => item.id === id);
    }

    setSelectedProduct(product: IProduct): void {
        this._selectedProduct = product;
    }

    getSelectedProduct(): IProduct | null {
        return this._selectedProduct;
    }
}
