import { Card } from "../base/Card";
import { categoryMap } from "../../utils/constants";
import { IProduct } from "../../types/index";

export class CardPreview extends Card<IProduct> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);
        this.categoryElement = container.querySelector(
            ".card__category",
        ) as HTMLElement;
        this.imageElement = container.querySelector(
            ".card__image",
        ) as HTMLImageElement;
        this.descriptionElement = container.querySelector(
            ".card__text",
        ) as HTMLElement;
        this.buttonElement = container.querySelector(
            ".button",
        ) as HTMLButtonElement;
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        this.categoryElement.className = `card__category ${categoryMap[value]}`;
    }

    set image(value: string) {
        this.setImage(this.imageElement, value);
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }

    disableButton(disabled: boolean) {
        this.buttonElement.disabled = disabled;
    }

    onButtonClick(callback: () => void) {
        this.buttonElement.addEventListener("click", callback);
    }
}
