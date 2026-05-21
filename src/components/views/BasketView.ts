import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

interface IBasketView {
    items: HTMLElement[];
    buttonDisabled: boolean;
    totalPrice: number;
}

export class BasketView extends Component<IBasketView> {
    protected listElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;
    protected priceElement: HTMLElement;

    constructor(
        container: HTMLElement,
        protected events: EventEmitter,
    ) {
        super(container);
        this.listElement = ensureElement(".basket__list", container);
        this.buttonElement = ensureElement<HTMLButtonElement>(
            ".basket__button",
            container,
        );
        this.priceElement = ensureElement(".basket__price", container);

        this.buttonElement.addEventListener("click", () => {
            this.events.emit("basket:order");
        });
    }

    set items(items: HTMLElement[]) {
        this.listElement.replaceChildren(...items);
    }

    set buttonDisabled(disabled: boolean) {
        this.buttonElement.disabled = disabled;
    }

    set totalPrice(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }
}
