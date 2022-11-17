import { IModel } from "./model.interface";
import { IUrlFailures } from "./url-failure.interface";

export interface IUrl extends IModel {
  url: string;
  active: boolean;
  failing: boolean;
  failures?: Array<IUrlFailures>;
  success?: Array<IUrlSuccess>;
  collection_id: number;
  avg_time: string;
}

export interface IUrlSuccess extends IModel {
  url_id: number;
  time: string;
}
