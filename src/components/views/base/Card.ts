import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

export interface ICard {
    title: string;
    price: number | null;
}

export class Card<T extends ICard> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.titleElement = ensureElement(".card__title", container);
        this.priceElement = ensureElement(".card__price", container);
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        if (value === null) {
            this.priceElement.textContent = "Недоступно";
        } else {
            this.priceElement.textContent = `${value} синапсов`;
        }
    }
}
