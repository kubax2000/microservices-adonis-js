import {inject} from "@adonisjs/core";
import {InternalPriceApi} from "#external/price-api/InternalPriceApi";
import CreateItemData from "#services/data/CreateItemData";
import {ItemCondition} from "#models/ItemCondition";
import OpenLibraryApi from "../external/book-api/OpenLibraryApi.js";
import {ItemStatus} from "#models/ItemStatus";
import Item from "#models/Item";


@inject()
export default class CreateItemService {
  constructor(
    private bookApi: OpenLibraryApi,
    private priceApi: InternalPriceApi,
  ) {
  }

  public async createItem(data: CreateItemData) {
    const price = await this.getPriceByIsbnAndCondition(data.getIsbn(), data.getCondition())

    const info = await this.bookApi.getBookInfoByISBN(data.getIsbn())

    const item = new Item()
    item.isbn = data.getIsbn()
    item.condition = data.getCondition()
    item.price = price
    item.title = info?.title || null

    item.status = this.getStatus(item)

    return item;
  }

  private async getPriceByIsbnAndCondition(isbn: string, condition: ItemCondition): Promise<number|null> {
    const price = await this.priceApi.getPrice(isbn)
    if (price === null) {
      return null
    }

    switch (condition) {
      case ItemCondition.New:
        return price
      case ItemCondition.AsNew:
        return price * 0.8
      case ItemCondition.Damaged:
        return price * 0.5
      default:
        throw new Error("Invalid condition")
    }
  }

  private getStatus(item: Item): ItemStatus {
    if (item.price === null) {
      return ItemStatus.reviewNeeded
    }

    if (item.title === null) {
      return ItemStatus.reviewNeeded
    }

    return ItemStatus.ready
  }
}
