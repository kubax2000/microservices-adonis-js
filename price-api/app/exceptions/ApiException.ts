
export default class ApiException extends Error {
  private code: string = "INTERNAL_SERVER_ERROR"
  private statusCode: number = 500

  constructor(message: string) {
    super(message);
  }

  public static create(message: string): ApiException {
    return new ApiException(message)
  }

  public getCode(): string|null {
    return this.code
  }

  public withCode(code: string): ApiException {
    this.code = code

    return this
  }

  public getStatusCode(): number {
    return this.statusCode
  }

  public withStatusCode(statusCode: number): ApiException {
    this.statusCode = statusCode

    return this
  }
}
