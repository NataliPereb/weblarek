import { Component } from "../base/Component";

export class BasketView extends Component<{}> {
    protected listElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.listElement = container.querySelector(
            ".basket__list",
        ) as HTMLElement;
        this.buttonElement = container.querySelector(
            ".basket__button",
        ) as HTMLButtonElement;
        this.priceElement = container.querySelector(
            ".basket__price",
        ) as HTMLElement;
    }

    set items(items: HTMLElement[]) {
        this.listElement.innerHTML = "";
        this.listElement.append(...items);
    }

    set buttonDisabled(disabled: boolean) {
        this.buttonElement.disabled = disabled;
    }

    set totalPrice(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }

    onOrderClick(callback: () => void) {
        this.buttonElement.addEventListener("click", callback);
    }

    set isEmpty(value: boolean) {
        if (value) {
            this.listElement.innerHTML =
                '<p class="basket__empty">Корзина пуста</p>';
            this.buttonElement.disabled = true;
        } else {
            this.buttonElement.disabled = false;
        }
    }
}
