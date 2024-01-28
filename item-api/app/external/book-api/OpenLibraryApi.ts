import * as config from "#config/external";


export type BookInfo = {
  title: string;
}

type OpenLibraryApiResponse = {
  [key: string]: BookInfo;
}

export default class OpenLibraryApi {
  public async getBookInfoByISBN(isbn: string): Promise<BookInfo|null> {
    const url = `${config.openLibraryApiUrl}/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
    const response = await fetch(url)
    const json = await response.json() as OpenLibraryApiResponse

    const bookInfo = json[`ISBN:${isbn}`]
    if (bookInfo == undefined) {
      return null
    }

    return bookInfo
  }
}
