import Random from "#utils/Random";
import ApiException from "#exceptions/ApiException";

export default class BookPriceService {
  private readonly MIN_BOOK_PRICE = 10;
  private readonly MAX_BOOK_PRICE = 5000;

  getPriceByISBN(isbn: string): number {
    const isFound = Random.boolean(isbn)
    if (!isFound) {
      throw ApiException
        .create("Book price not found")
        .withCode("NOT_FOUND")
        .withStatusCode(404)
    }

    return Random.number(isbn, this.MIN_BOOK_PRICE, this.MAX_BOOK_PRICE)
  }
}
