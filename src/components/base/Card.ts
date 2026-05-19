import { Component } from "./Component";

export class Card<T> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.titleElement = container.querySelector(
            ".card__title",
        ) as HTMLElement;
        this.priceElement = container.querySelector(
            ".card__price",
        ) as HTMLElement;
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        if (value === null) {
            this.priceElement.textContent = "Недоступно";
            const button = this.container.querySelector(
                ".card__button",
            ) as HTMLButtonElement;
            if (button) {
                button.disabled = true;
                button.textContent = "Недоступно";
            }
        } else {
            this.priceElement.textContent = `${value} синапсов`;
        }
    }
}
