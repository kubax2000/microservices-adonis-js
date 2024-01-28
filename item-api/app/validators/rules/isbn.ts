import { FieldContext } from '@vinejs/vine/types';
import vine from "@vinejs/vine";
import isbn3 from "isbn3";

function isbn(
  value: unknown,
  _: unknown,
  field: FieldContext
) {
  if (typeof value !== 'string') {
    return
  }

  const result = isbn3.audit(value)

  if (!result.validIsbn) {
    field.report(
      'The {{ field }} field is not valid ISBN',
      'isbn',
      field
    )
  }
}

export const isbnRule = vine.createRule(isbn)
