import { BaseModel, column } from '@adonisjs/lucid/orm'
import {ItemCondition} from "#models/ItemCondition";
import {ItemStatus} from "#models/ItemStatus";

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare isbn: string

  @column()
  declare title: string | null

  @column()
  declare price: number | null

  @column()
  declare condition: ItemCondition

  @column()
  declare status: ItemStatus
}
