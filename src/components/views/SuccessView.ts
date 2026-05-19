import { Component } from "../base/Component";

export class SuccessView extends Component<{}> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.descriptionElement = container.querySelector(
            ".order-success__description",
        ) as HTMLElement;
        this.closeButton = container.querySelector(
            ".order-success__close",
        ) as HTMLButtonElement;
    }

    set totalSpent(value: number) {
        this.descriptionElement.textContent = `Списано ${value} синапсов`;
    }

    onClose(callback: () => void) {
        this.closeButton.addEventListener("click", callback);
    }
}
