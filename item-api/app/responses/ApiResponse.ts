import {ApiResponseResult} from "#responses/ApiResponseResult";

export default class ApiResponse {
  static error(code: string, message: string) {
    return {
      code,
      message,
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
