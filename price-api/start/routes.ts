/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import BookPriceController from "#controllers/BookPriceController";

router
  .get('books/:isbn/price', [BookPriceController, 'show'])
  .where('isbn', {
    match: /^[0-9\-]+$/,
    cast: (isbn: string) => isbn.replaceAll('-', '')
  })
