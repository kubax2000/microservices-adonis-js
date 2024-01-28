import {HttpContext} from "@adonisjs/core/http";
import {inject} from "@adonisjs/core";
import BookPriceService from "#services/BookPriceService";
import ApiResponse from "#responses/ApiResponse";
import BookPriceResponse from "#responses/BookPriceResponse";

@inject()
export default class BookPriceController {
  constructor(private bookPriceService: BookPriceService) {
  }

  async show({ params }: HttpContext) {
    const isbn = params.isbn
    if (!isbn) {
      throw new Error("ISBN is required")
    }

    const price = this.bookPriceService.getPriceByISBN(isbn)

    const response = new BookPriceResponse(isbn, price)

    return ApiResponse.success("SUCCESS", response)
  }
}
