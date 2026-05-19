import { Card } from "../base/Card";
import { IProduct } from "../../types/index";

export class CardBasket extends Card<IProduct> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);
        this.indexElement = container.querySelector(
            ".basket__item-index",
        ) as HTMLElement;
        this.deleteButton = container.querySelector(
            ".basket__item-delete",
        ) as HTMLButtonElement;
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }

    onDeleteClick(callback: () => void) {
        this.deleteButton.onclick = callback;
    }
}
