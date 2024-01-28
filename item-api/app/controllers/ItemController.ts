import {HttpContext} from "@adonisjs/core/http";
import {createItemValidator} from "#validators/ItemValidator";
import CreateItemService from "#services/CreateItemService";
import {inject} from "@adonisjs/core";
import CreateItemDataService from "#services/CreateItemDataService";
import ApiResponse from "../responses/ApiResponse.js";
import {ItemStatus} from "#models/ItemStatus";

@inject()
export default class ItemController {
  constructor(
    private createItemDataService: CreateItemDataService,
    private createItemService: CreateItemService,
  ) {
  }

  async create({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createItemValidator.validate(data)

    const createItemData = this.createItemDataService.createItemData(payload)

    const item = await this.createItemService.createItem(createItemData)

    if (item.status === ItemStatus.reviewNeeded) {
      const apiResponse = ApiResponse.success("REVIEW_NEEDED", item)
      response.status(202).json(apiResponse)
      return
    }

    return ApiResponse.success("ITEM_CREATED", item)
  }
}
