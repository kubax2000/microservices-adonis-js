import {ItemCondition} from "#models/ItemCondition";
import CreateItemData from "#services/data/CreateItemData";
import isbn3 from "isbn3";


type CreateItemPayload = {
  condition: ItemCondition;
  isbn: string;
}

export default class CreateItemDataService {
  createItemData(data: CreateItemPayload): CreateItemData {
    const isbn = isbn3.parse(data.isbn)
    if (!isbn || !isbn.isbn13) {
      throw new Error("Invalid ISBN")
    }

    return new CreateItemData(
      data.condition,
      isbn.isbn13,
    )
  }
}
