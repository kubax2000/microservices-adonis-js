
export default class BookPriceResponse {
  constructor(
    public readonly isbn: string,
    public readonly price: number
  ) {
  }
}
