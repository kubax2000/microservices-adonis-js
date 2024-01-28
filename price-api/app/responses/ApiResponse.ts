import {ApiResponseResult} from "#responses/ApiResponseResult";
import ApiException from "#exceptions/ApiException";

export default class ApiResponse {
  static error(code: string, message: string) {
    return {
      code,
      message,
      result: ApiResponseResult.Error,
    }
  }

  static errorFromApiException(exception: ApiException) {
    return {
      code: exception.getCode(),
      message: exception.message,
      result: ApiResponseResult.Error,
    }
  }

  static success(code: string, data?: any) {
    return {
      code,
      data,
      result: ApiResponseResult.Success,
    }
  }
}
