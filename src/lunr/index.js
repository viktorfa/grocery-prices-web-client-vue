import lunr from 'lunr'

import {
  getProductFromSearchResult
} from '../helpers'

let index = null;
let objects = null;

export const getLunrQueryString = query => query.startsWith("+") ?
  query :
  `${query} ${query}~1 ${query}* *${query.substring(
    0,
    query.length - 1
  )}`;

export const loadIndex = storedIndex => index = lunr.Index.load(storedIndex)
export const loadObjects = storedObjects => objects = storedObjects;
export const lunrSearch = async query => {
  if (index && index.search && objects) {
    const searchResults = index.search(getLunrQueryString(query))
    const result = searchResults.map(result => getProductFromSearchResult(result, objects))
    return {
      ok: true,
      data: result,
    }
  } else {
    return {
      ok: false,
      error: 'Not loaded',
    }
  }
}