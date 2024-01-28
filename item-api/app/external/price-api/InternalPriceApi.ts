import * as config from "#config/external";
import fetch from "node-fetch";
import {InternalPriceApiResponse} from "./InternalPriceApiResponse.js";
import {InternalPriceApiResult} from "./InternalPriceApiResult.js";

type BookPriceResponse = {
  isbn: string;
  price: number;
}

export class InternalPriceApi {
  async getPrice(isbn: string): Promise<number|null> {
    const response = await fetch(`${config.internalPriceApiUrl}/books/${isbn}/price`);
    const data = await response.json() as InternalPriceApiResponse<BookPriceResponse>;

    if (data.result !== InternalPriceApiResult.success) {
      return null
    }

    return data.data!.price;
  }
}
