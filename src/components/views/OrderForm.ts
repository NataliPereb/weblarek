import { Form } from "../base/Form";
import { IOrderForm } from "../../types/index";
import { EventEmitter } from "../base/Events";

export class OrderForm extends Form<IOrderForm> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);

        this.cardButton = container.querySelector(
            'button[name="card"]',
        ) as HTMLButtonElement;
        this.cashButton = container.querySelector(
            'button[name="cash"]',
        ) as HTMLButtonElement;

        this.cardButton.addEventListener("click", () =>
            this.setPayment("card"),
        );
        this.cashButton.addEventListener("click", () =>
            this.setPayment("cash"),
        );
    }

    getData(): IOrderForm {
        const address =
            (
                this.container.querySelector(
                    'input[name="address"]',
                ) as HTMLInputElement
            )?.value || "";
        const payment = this.cardButton.classList.contains("button_alt-active")
            ? "card"
            : this.cashButton.classList.contains("button_alt-active")
              ? "cash"
              : null;
        return { payment, address };
    }

    private setPayment(value: "card" | "cash") {
        this.cardButton.classList.remove("button_alt-active");
        this.cashButton.classList.remove("button_alt-active");
        const activeButton =
            value === "card" ? this.cardButton : this.cashButton;
        activeButton.classList.add("button_alt-active");
        this.setButtonDisabled(!this.isValid());
    }

    protected isValid(): boolean {
        const isAddressFilled = this.inputs.every(
            (input) => input.value.trim() !== "",
        );
        const isPaymentSelected =
            this.cardButton.classList.contains("button_alt-active") ||
            this.cashButton.classList.contains("button_alt-active");
        return isAddressFilled && isPaymentSelected;
    }
}
