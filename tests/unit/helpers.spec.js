import {
  getProductFromSearchResult
} from '@/helpers'

describe('getProductFromSearchResult', () => {
  test('should return an object', () => {
    const heading = 'grandiosa'
    const score = .5
    const ref = 123
    const objects = {
      [ref]: {
        heading,
      }
    }
    const result = {
      score,
      ref,
    }
    const expected = {
      heading,
      score,
      id: ref,
    }
    const actual = getProductFromSearchResult(result, objects)
    expect(actual).toEqual(expected)
  })
  test('should fail gracefully', () => {
    const heading = 'grandiosa'
    const score = .5
    const ref = 123
    const objects = {
      notResultRef: {
        heading,
      }
    }
    const result = {
      score,
      ref,
    }
    const actual = getProductFromSearchResult(result, objects)
    expect(actual).toBeFalsy()
  })
})