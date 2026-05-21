import "./scss/styles.scss";
import { BasketModel } from "./components/Models/BasketModel";
import { BuyerModel } from "./components/Models/BuyerModel";
import { CatalogModel } from "./components/Models/CatalogModel";
import { AppApi } from "./components/AppApi/AppApi";
import { Api } from "./components/base/Api";
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";
import { Modal } from "../src/components/views/Modal";
import { Header } from "./components/views/Header";
import { CardCatalog } from "./components/views/CardCatalog";
import { CardPreview } from "./components/views/CardPreview";
import { BasketView } from "./components/views/BasketView";
import { CardBasket } from "./components/views/CardBasket";
import { OrderForm } from "./components/views/OrderForm";
import { ContactsForm } from "./components/views/ContactForm";
import { SuccessView } from "./components/views/SuccessView";
import { cloneTemplate } from "./utils/utils";
import { Gallery } from "./components/views/Gallery";

// ===== ИНИЦИАЛИЗАЦИЯ =====
const events = new EventEmitter();
const catalog = new CatalogModel(events);
const basket = new BasketModel(events);
const buyer = new BuyerModel(events);
const api = new Api(API_URL);
const appApi = new AppApi(api);

const modal = new Modal(
    document.querySelector("#modal-container") as HTMLElement,
);

const header = new Header(
    document.querySelector(".header") as HTMLElement,
    events,
);
const gallery = new Gallery(document.querySelector(".gallery") as HTMLElement);

const orderForm = new OrderForm(cloneTemplate("#order"), events);
const contactsForm = new ContactsForm(cloneTemplate("#contacts"), events);
const basketView = new BasketView(cloneTemplate("#basket"), events);
const successView = new SuccessView(cloneTemplate("#success"), events);
const previewCard = new CardPreview(cloneTemplate("#card-preview"), events);

// ===== ФУНКЦИИ ОТКРЫТИЯ МОДАЛОК =====
function openOrderForm() {
    modal.setContent(orderForm.render());
    modal.open();
}

function openContactsForm() {
    modal.setContent(contactsForm.render());
    modal.open();
}

function openBasket() {
    modal.setContent(basketView.render());
    modal.open();
}

function openSuccessView(total: number) {
    successView.totalSpent = total;
    modal.setContent(successView.render());
    modal.open();
}

// ===== ОТПРАВКА ЗАКАЗА =====
function sendOrder() {
    const orderData = {
        ...buyer.getData(),
        total: basket.getTotalPrice(),
        items: basket.getItems().map((item) => item.id),
    };

    appApi
        .postOrder(orderData)
        .then((result) => {
            basket.clear();
            buyer.clear();

            // Очищаем поля форм
            orderForm.activePayment = null;
            orderForm.address = "";
            contactsForm.email = "";
            contactsForm.phone = "";
            orderForm.error = "";
            contactsForm.error = "";

            modal.close();
            openSuccessView(result.total);
        })
        .catch((err) => console.error("Ошибка:", err));
}

// ===== ЗАГРУЗКА ТОВАРОВ =====
async function loadProducts() {
    const response = await appApi.getProducts();
    response.items.forEach((item) => {
        if (item.image.startsWith("/")) {
            item.image = CDN_URL + item.image;
        }
    });
    catalog.setItems(response.items);
}
loadProducts().catch((err) => console.error("Ошибка загрузки товаров:", err));

// ===== СОБЫТИЯ =====

events.on("basketUpdate", () => {
    header.counter = basket.getItemCount();

    const items = basket.getItems();
    const cards = items.map((item, i) => {
        const card = new CardBasket(cloneTemplate("#card-basket"), () => {
            events.emit("basket:remove", { id: item.id });
        });
        card.title = item.title;
        card.price = item.price;
        card.index = i + 1;
        return card.render();
    });

    basketView.render({
        items: cards,
        totalPrice: basket.getTotalPrice(),
        buttonDisabled: basket.getItemCount() === 0,
    });
});

events.on("catalogUpdate", () => {
    const products = catalog.getItems();
    const cardElements: HTMLElement[] = [];

    for (const product of products) {
        const card = new CardCatalog(cloneTemplate("#card-catalog"), () => {
            events.emit("card:select", { id: product.id });
        });
        card.title = product.title;
        card.price = product.price;
        card.category = product.category;
        card.image = product.image;
        cardElements.push(card.render());
    }

    gallery.items = cardElements;
});

events.on("selectedProductUpdate", () => {
    const product = catalog.getSelectedProduct();
    if (!product) return;

    previewCard.title = product.title;
    previewCard.price = product.price;
    previewCard.category = product.category;
    previewCard.image = product.image;
    previewCard.description = product.description;

    const isInBasket = basket.hasItem(product.id);
    previewCard.buttonText = isInBasket ? "Удалить из корзины" : "В корзину";

    if (product.price === null) {
        previewCard.buttonDisabled = true;
        previewCard.buttonText = "Недоступно";
    } else {
        previewCard.buttonDisabled = false;
    }

    modal.setContent(previewCard.render());
    modal.open();
});

events.on("basket:open", () => {
    openBasket();
});

events.on("basket:order", () => {
    openOrderForm();
});

events.on("card:select", (data: { id: string }) => {
    catalog.setSelectedProduct(data.id);
});

events.on("card:action", () => {
    const product = catalog.getSelectedProduct();
    if (!product) return;

    if (basket.hasItem(product.id)) {
        basket.removeItem(product.id);
    } else {
        basket.addItem(product);
    }
    modal.close();
});

events.on("order:change", (data: { payment: "card" | "cash" }) => {
    buyer.setField("payment", data.payment);
});

events.on("form.changed", (data: { name: string; value: string }) => {
    if (data.name === "address") {
        buyer.setField("address", data.value);
    }
    if (data.name === "email") {
        buyer.setField("email", data.value);
    }
    if (data.name === "phone") {
        buyer.setField("phone", data.value);
    }
});

events.on("buyerUpdate", () => {
    const data = buyer.getData();
    const errors = buyer.validateAll();

    // Обновляем форму заказа
    orderForm.activePayment = data.payment;
    orderForm.address = data.address || "";
    orderForm.valid = !errors.payment && !errors.address;
    orderForm.error = errors.payment || errors.address || "";

    // Обновляем форму контактов
    contactsForm.email = data.email || "";
    contactsForm.phone = data.phone || "";
    contactsForm.valid = !errors.email && !errors.phone;
    contactsForm.error = errors.email || errors.phone || "";
});

// Отправка формы заказа
events.on("order:submit", () => {
    modal.close();
    openContactsForm();
});

// Отправка формы контактов
events.on("contacts:submit", () => {
    sendOrder();
});

events.on("success:close", () => {
    modal.close();
});

events.on("basket:remove", (data: { id: string }) => {
    basket.removeItem(data.id);
});
