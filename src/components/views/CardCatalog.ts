import { Card } from "../base/Card";
import { IProduct } from "../../types/index";
import { categoryMap } from "../../utils/constants";

export class CardCatalog extends Card<IProduct> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(container: HTMLElement) {
        super(container);
        this.categoryElement = container.querySelector(
            ".card__category",
        ) as HTMLElement;
        this.imageElement = container.querySelector(
            ".card__image",
        ) as HTMLImageElement;
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        const modifier = categoryMap[value];
        if (modifier) {
            this.categoryElement.classList.add(modifier);
        }
    }

    set image(value: string) {
        console.log("Image URL:", value);
        this.setImage(this.imageElement, value);
    }
}
