import { test } from '@japa/runner'
import BookPriceService from "#services/BookPriceService";

test.group('Services book price', () => {
  test('known price', async ({ assert }) => {
    const bookPriceService = new BookPriceService()
    const price = bookPriceService.getPriceByISBN('9780201558029')

    assert.equal(price, 3872)
  })

  test('unknown price', async ({ assert }) => {
    try {
      const bookPriceService = new BookPriceService()
      bookPriceService.getPriceByISBN('0430323484')

      assert.fail('Should throw error')
    } catch (e) {
      assert.equal(e.message, 'Book price not found')
    }
  })
})
