import { Form } from "./base/Form";
import { TOrderForm } from "../../types/index";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class OrderForm extends Form<TOrderForm> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);

        this.cardButton = ensureElement(
            'button[name="card"]',
            container,
        ) as HTMLButtonElement;
        this.cashButton = ensureElement(
            'button[name="cash"]',
            container,
        ) as HTMLButtonElement;

        this.cardButton.addEventListener("click", () => {
            events.emit("order:change", { payment: "card" });
        });
        this.cashButton.addEventListener("click", () => {
            events.emit("order:change", { payment: "cash" });
        });

        this.container.addEventListener("submit", (e) => {
            e.preventDefault();
            events.emit("order:submit");
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set error(value: string) {
        this.errorsContainer.textContent = value;
    }

    set activePayment(value: "card" | "cash" | null) {
        this.cardButton.classList.remove("button_alt-active");
        this.cashButton.classList.remove("button_alt-active");

        if (value === "card") {
            this.cardButton.classList.add("button_alt-active");
        } else if (value === "cash") {
            this.cashButton.classList.add("button_alt-active");
        }
    }
}
