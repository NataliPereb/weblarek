import { Form } from "../base/Form";
import { IContactsForm } from "../../types";
import { EventEmitter } from "../base/Events";

export class ContactsForm extends Form<IContactsForm> {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);

        this.emailElement = container.querySelector(
            'input[name="email"]',
        ) as HTMLInputElement;
        this.phoneElement = container.querySelector(
            'input[name="phone"]',
        ) as HTMLInputElement;

        const update = () => this.setButtonDisabled(!this.isValid());

        this.emailElement.addEventListener("input", update);
        this.phoneElement.addEventListener("input", update);
    }

    protected isValid(): boolean {
        return (
            this.emailElement.value.trim() !== "" &&
            this.phoneElement.value.trim() !== ""
        );
    }
}
