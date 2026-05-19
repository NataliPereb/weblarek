import { IOrder, IOrderResult, IProductsResponse } from "../../types/index";
import { IApi } from "../../types/index";
import { CDN_URL } from "../../utils/constants";

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getProducts(): Promise<IProductsResponse> {
        return this._baseApi.get<IProductsResponse>("/product/").then((res) => {
            res.items.forEach((item) => {
                item.image = CDN_URL + item.image;
            });
            return res;
        });
    }

    postOrder(order: IOrder): Promise<IOrderResult> {
        return this._baseApi.post<IOrderResult>("/order", order);
    }
}
