import {test} from '@japa/runner'
import CreateItemService from "#services/CreateItemService";
import OpenLibraryApi, {BookInfo} from "#external/book-api/OpenLibraryApi";
import {InternalPriceApi} from "#external/price-api/InternalPriceApi";
import app from "@adonisjs/core/services/app";
import CreateItemData from "#services/data/CreateItemData";
import {ItemCondition} from "#models/ItemCondition";

test.group('Services create item', () => {
  test('example test', async ({ assert }) => {
    class FakeInternalPriceApi extends InternalPriceApi {
      getPrice(_: string): Promise<number|null> {
        return Promise.resolve(400)
      }
    }

    class FakeOpenLibraryApi extends OpenLibraryApi {
      getBookInfoByISBN(_: string): Promise<BookInfo|null> {
        return Promise.resolve({
          title: 'Test title'
        })
      }
    }

    // Mock
    app.container.swap(OpenLibraryApi, () => {
      return new FakeOpenLibraryApi()
    })

    app.container.swap(InternalPriceApi, () => {
      return new FakeInternalPriceApi()
    })

    // Create service
    const createItemService = await app.container.make(CreateItemService)

    // Execute
    const data = new CreateItemData(ItemCondition.New, '9780201558029')
    const item = await createItemService.createItem(data)

    // Assert
    assert.equal(item.price, 400)
    assert.equal(item.title, 'Test title')
    assert.equal(item.isbn, '9780201558029')
    assert.equal(item.condition, 'new')
    assert.equal(item.status, 'ready')
  })

  test('example test', async ({ assert }) => {
    class FakeInternalPriceApi extends InternalPriceApi {
      getPrice(_: string): Promise<number|null> {
        return Promise.resolve(600)
      }
    }

    class FakeOpenLibraryApi extends OpenLibraryApi {
      getBookInfoByISBN(_: string): Promise<BookInfo|null> {
        return Promise.resolve(null)
      }
    }

    // Mock
    app.container.swap(OpenLibraryApi, () => {
      return new FakeOpenLibraryApi()
    })

    app.container.swap(InternalPriceApi, () => {
      return new FakeInternalPriceApi()
    })

    // Create service
    const createItemService = await app.container.make(CreateItemService)

    // Execute
    const data = new CreateItemData(ItemCondition.Damaged, '9780201558029')
    const item = await createItemService.createItem(data)

    // Assert
    assert.equal(item.price, 300)
    assert.equal(item.title, null)
    assert.equal(item.isbn, '9780201558029')
    assert.equal(item.condition, 'damaged')
    assert.equal(item.status, 'reviewNeeded')
  })
})
