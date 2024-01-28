import {InternalPriceApiResult} from "./InternalPriceApiResult.js";

export type InternalPriceApiResponse<T> = {
  code: string;
  data?: T;
  message?: string;
  result: InternalPriceApiResult;
}
