import { IModel } from "./model.interface";
import { IUrlFailures } from "./url-failure.interface";

export interface IUrl extends IModel {
  url: string;
  active: boolean;
  failing: boolean;
  failures?: Array<IUrlFailures>;
  collection_id: number;
}
