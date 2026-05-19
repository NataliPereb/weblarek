import { Component } from "../base/Component";

export class Header extends Component<{}> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.basketButton = container.querySelector(
            ".header__basket",
        ) as HTMLButtonElement;
        this.counterElement = container.querySelector(
            ".header__basket-counter",
        ) as HTMLElement;
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }

    onBasketClick(callback: () => void) {
        this.basketButton.addEventListener("click", callback);
    }
}
