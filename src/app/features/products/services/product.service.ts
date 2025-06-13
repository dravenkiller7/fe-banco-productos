import {Injectable} from "@angular/core";
import {ApiBaseService} from "../../../core/services/api-base.service";
import {HttpClient} from "@angular/common/http";
import {PRODUCTS_API_ROOT_PATH} from "../../../core/config/api-endpoints";
import {ProductApiModel} from "../models/api/product-api.model";
import {ProductResponseModel} from "../models/api/product-response.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiBaseService<ProductResponseModel, ProductApiModel> {
  constructor(
    protected override httpClient: HttpClient
  ) {
    super(httpClient, PRODUCTS_API_ROOT_PATH);
  }
}
