import { IModel } from "./model.interface";

export interface IUrl extends IModel {
  url: string;
  active: boolean;
  failing: boolean;
}
