import { Form } from "./base/Form";
import { TContactsForm } from "../../types";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class ContactsForm extends Form<TContactsForm> {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);

        this.emailElement = ensureElement(
            'input[name="email"]',
            container,
        ) as HTMLInputElement;
        this.phoneElement = ensureElement(
            'input[name="phone"]',
            container,
        ) as HTMLInputElement;

        this.container.addEventListener("submit", (e) => {
            e.preventDefault();
            events.emit("contacts:submit");
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set error(value: string) {
        this.errorsContainer.textContent = value;
    }
}
