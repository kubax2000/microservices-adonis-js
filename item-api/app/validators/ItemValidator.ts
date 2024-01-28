import vine from "@vinejs/vine";
import {isbnRule} from "./rules/isbn.js";
import {ItemCondition} from "#models/ItemCondition";

export const createItemValidator = vine.compile(
  vine.object({
    isbn: vine.string().use(isbnRule()),
    condition: vine.enum(ItemCondition),
  })
)
