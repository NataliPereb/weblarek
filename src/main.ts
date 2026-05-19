import "./scss/styles.scss";
import { BasketModel } from "./components/Models/BasketModel";
import { BuyerModel } from "./components/Models/BuyerModel";
import { CatalogModel } from "./components/Models/CatalogModel";
import { AppApi } from "./components/AppApi/AppApi";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";
import { Modal } from "./components/base/Modal";
import { Header } from "./components/views/Header";
import { CardCatalog } from "./components/views/CardCatalog";
import { CardPreview } from "./components/views/CardPreview";
import { BasketView } from "./components/views/BasketView";
import { CardBasket } from "./components/views/CardBasket";
import { OrderForm } from "./components/views/OrderForm";
import { ContactsForm } from "./components/views/ContactForm";
import { SuccessView } from "./components/views/SuccessView";
import { cloneTemplate } from "./utils/utils";

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
const header = new Header(document.querySelector(".header") as HTMLElement);
const galleryContainer = document.querySelector(".gallery") as HTMLElement;

// ===== ФУНКЦИИ ОТКРЫТИЯ МОДАЛОК =====
function openOrderForm() {
    const orderForm = new OrderForm(cloneTemplate("#order"), events);
    modal.setContent(orderForm.render());
    modal.open();
}

function openContactsForm() {
    const contactsForm = new ContactsForm(cloneTemplate("#contacts"), events);
    modal.setContent(contactsForm.render());
    modal.open();
}

function openBasket() {
    const basketView = new BasketView(cloneTemplate("#basket"));
    const items = basket.getItems();
    const cards = items.map((item, i) => {
        const card = new CardBasket(cloneTemplate("#card-basket"));
        card.title = item.title;
        card.price = item.price;
        card.index = i + 1;
        card.onDeleteClick(() => {
            basket.removeItem(item.id);
            openBasket();
        });
        return card.render();
    });
    basketView.items = cards;
    basketView.totalPrice = basket.getTotalPrice();
    basketView.onOrderClick(() => openOrderForm());
    basketView.isEmpty = basket.getItemCount() === 0;
    modal.setContent(basketView.render());
    modal.open();
}

function openSuccessView(total: number) {
    const successView = new SuccessView(cloneTemplate("#success"));
    successView.totalSpent = total;
    successView.onClose(() => {
        modal.close();
        basket.clear();
        buyer.clear();
    });
    modal.setContent(successView.render());
    modal.open();
}

// ===== ОТПРАВКА ЗАКАЗА =====
function sendOrder() {
    const orderData = {
        payment: buyer.getData().payment,
        email: buyer.getData().email,
        phone: buyer.getData().phone,
        address: buyer.getData().address,
        total: basket.getTotalPrice(),
        items: basket.getItems().map((item) => item.id),
    };

    appApi
        .postOrder(orderData)
        .then((result) => {
            console.log("Заказ отправлен:", result);
            basket.clear();
            modal.close();
            openSuccessView(result.total);
        })
        .catch((err) => console.error("Ошибка:", err));
}

// ===== ЗАГРУЗКА ТОВАРОВ =====
async function loadProducts() {
    const response = await appApi.getProducts();
    catalog.setItems(response.items);
}
loadProducts();

// ===== СОБЫТИЯ =====
events.on("basketUpdate", () => {
    header.counter = basket.getItemCount();
});

events.on("catalogUpdate", () => {
    const products = catalog.getItems();
    const cardElements: HTMLElement[] = [];
    const cardTemplate = document.querySelector(
        "#card-catalog",
    ) as HTMLTemplateElement;

    for (const product of products) {
        const cardElement = cardTemplate.content.firstElementChild!.cloneNode(
            true,
        ) as HTMLElement;
        const card = new CardCatalog(cardElement);
        card.title = product.title;
        card.price = product.price;
        card.category = product.category;
        card.image = product.image;
        const renderedCard = card.render();
        renderedCard.setAttribute("data-id", product.id);
        cardElements.push(renderedCard);
    }

    galleryContainer.innerHTML = "";
    galleryContainer.append(...cardElements);
});

events.on("submit", (data: any) => {
    if (data.email !== undefined || data.phone !== undefined) {
        if (data.email) buyer.setField("email", data.email);
        if (data.phone) buyer.setField("phone", data.phone);
        sendOrder();
    }

    if (data.payment !== undefined || data.address !== undefined) {
        if (data.payment) buyer.setField("payment", data.payment);
        if (data.address) buyer.setField("address", data.address);
        modal.close();
        openContactsForm();
    }
});

events.on("card:select", (data: { id: string }) => {
    const product = catalog.getProduct(data.id);
    if (!product) return;

    const previewElement = cloneTemplate("#card-preview");
    const previewCard = new CardPreview(previewElement);
    previewCard.title = product.title;
    previewCard.price = product.price;
    previewCard.category = product.category;
    previewCard.image = product.image;
    previewCard.description = product.description;

    const isInBasket = basket.hasItem(product.id);
    previewCard.buttonText = isInBasket ? "Удалить из корзины" : "В корзину";

    previewCard.onButtonClick(() => {
        if (basket.hasItem(product.id)) {
            basket.removeItem(product.id);
        } else {
            basket.addItem(product);
        }
        modal.close();
    });

    modal.setContent(previewCard.render());
    modal.open();
});

// ===== КЛИКИ =====
galleryContainer.addEventListener("click", (event) => {
    const card = (event.target as HTMLElement).closest(".gallery__item");
    if (card) {
        const id = card.getAttribute("data-id");
        if (id) events.emit("card:select", { id });
    }
});

header.onBasketClick(() => openBasket());
