import {ItemCondition} from "#models/ItemCondition";

export default class CreateItemData {
  constructor(
    private condition: ItemCondition,
    private isbn: string,
  ) {
  }

  public getCondition(): ItemCondition {
    return this.condition;
  }

  public getIsbn(): string {
    return this.isbn;
  }
}
