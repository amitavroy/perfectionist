import { IModel } from "./model.interface";

export interface IUser extends IModel {
  name: string;
  email: string;
}
