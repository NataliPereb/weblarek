import {
    IOrder,
    IOrderResult,
    IProductsResponse,
    IApi,
} from "../../types/index";

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getProducts(): Promise<IProductsResponse> {
        return this._baseApi.get<IProductsResponse>("/product/");
    }

    postOrder(order: IOrder): Promise<IOrderResult> {
        return this._baseApi.post<IOrderResult>("/order", order);
    }
}
