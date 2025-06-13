import {ProductApiModel} from "./product-api.model";

export interface ProductResponseModel {
  data?: ProductApiModel,
  message?: string
}
