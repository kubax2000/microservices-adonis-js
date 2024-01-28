import { test } from '@japa/runner'
import CreateItemDataService from "#services/CreateItemDataService";
import {ItemCondition} from "#models/ItemCondition";


test.group('Services create item data', () => {
  test('basic test', async ({ assert }) => {
    const createItemDataService = new CreateItemDataService()
    const data = createItemDataService.createItemData({
      condition: ItemCondition.New,
      isbn: '9780201558029',
    })

    assert.equal(data.getCondition(), 'new')
    assert.equal(data.getIsbn(), '9780201558029')
  })

  test('invalid isbn', async ({ assert }) => {
    const createItemDataService = new CreateItemDataService()

    try {
      createItemDataService.createItemData({
        condition: ItemCondition.New,
        isbn: '978020155802',
      })

      assert.fail('Should throw error')
    } catch (e) {
      assert.equal(e.message, 'Invalid ISBN')
    }
  })

  test('isbn parsing', async ({ assert }) => {
    const createItemDataService = new CreateItemDataService()
    const data = createItemDataService.createItemData({
      condition: ItemCondition.AsNew,
      isbn: '9-780-20155-802-9',
    })

    assert.equal(data.getCondition(), 'as_new')
    assert.equal(data.getIsbn(), '9780201558029')
  })
})
