import { test } from '@japa/runner'

test.group('Price show', () => {
  test('known price', async ({ client }) => {
    const response = await client.get('/books/9780201558029/price')

    response.assertStatus(200)
    response.assertBody({
      code: 'SUCCESS',
      data: {
        isbn: '9780201558029',
        price: 3872,
      },
      result: 'success'
    })
  })

  test('known price - format with dashes', async ({ client }) => {
    const response = await client.get('/books/978-020155-802-9/price')

    response.assertStatus(200)
    response.assertBody({
      code: 'SUCCESS',
      data: {
        isbn: '9780201558029',
        price: 3872,
      },
      result: 'success'
    })
  })

  test('unknown price', async ({ client }) => {
    const response = await client.get('/books/0430323484/price')

    response.assertStatus(404)
    response.assertBody({
      code: 'NOT_FOUND',
      message: 'Book price not found',
      result: 'error'
    })
  })

  test('unknown price - format with dashes', async ({ client }) => {
    const response = await client.get('/books/0-4303-2348-4/price')

    response.assertStatus(404)
    response.assertBody({
      code: 'NOT_FOUND',
      message: 'Book price not found',
      result: 'error'
    })
  })
})
