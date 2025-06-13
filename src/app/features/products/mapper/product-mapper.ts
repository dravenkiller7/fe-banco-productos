import {ProductApiModel} from "../models/api/product-api.model";
import {ProductoFinancieroModel} from "../models/producto-financiero.model";

export function mapProductFromBackend(product: ProductApiModel): ProductoFinancieroModel {
  return {
    id: product.id,
    nombre: product.name,
    descripcion: product.description,
    logo: product.logo,
    fechaLiberacion: product.date_release,
    fechaRevision: product.date_revision
  };
}

export function mapProductToBackend(model: ProductoFinancieroModel): ProductApiModel {
  return {
    id: model.id,
    name: model.nombre,
    description: model.descripcion,
    logo: model.logo,
    date_release: model.fechaLiberacion,
    date_revision: model.fechaRevision
  };
}
