import { IModel } from "./model.interface";

export interface ICollection extends IModel {
  name: string;
  creator_id: number;
}
