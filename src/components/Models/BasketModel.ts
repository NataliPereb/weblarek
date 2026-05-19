import { IProduct } from "../../types/index";
import { EventEmitter } from "../base/Events";

export class BasketModel {
    private items: IProduct[];
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.items = [];
        this.events = events;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(product: IProduct): void {
        this.items.push(product);
        this.events.emit("basketUpdate", this.items);
    }

    removeItem(id: string): void {
        this.items = this.items.filter((item) => item.id !== id);
        this.events.emit("basketUpdate", this.items);
    }

    clear(): void {
        this.items.length = 0;
        this.events.emit("basketUpdate", this.items);
    }

    getTotalPrice(): number {
        return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }

    getItemCount(): number {
        return this.items.length;
    }

    hasItem(id: string): boolean {
        return this.items.some((item) => item.id === id);
    }
}
