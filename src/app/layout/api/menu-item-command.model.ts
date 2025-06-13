import {MenuItemModel} from "./menu-item.model";

export interface MenuItemCommandEventModel {
  originalEvent?: Event;
  item?: MenuItemModel;
  index?: number;
}
