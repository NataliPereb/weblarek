import { Card } from "./base/Card";
import { IProduct } from "../../types/index";
import { ensureElement } from "../../utils/utils";

export class CardBasket extends Card<IProduct> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, onDelete: () => void) {
        super(container);
        this.indexElement = ensureElement(".basket__item-index", container);
        this.deleteButton = ensureElement<HTMLButtonElement>(
            ".basket__item-delete",
            container,
        );

        this.deleteButton.addEventListener("click", onDelete);
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}
