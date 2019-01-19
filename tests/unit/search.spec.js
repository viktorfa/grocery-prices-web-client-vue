import lunrIndex from '../assets/product-lunr-index-latest.json'
import productMap from '../assets/product-map-latest.json'

import {
  lunrSearch,
  loadIndex,
  loadObjects,
} from '@/search'



describe('lunrSearch', () => {
  beforeAll(() => {
    loadIndex(lunrIndex)
    loadObjects(productMap)
  })
  test('should return a promise', () => {
    expect(lunrSearch()).toBeInstanceOf(Promise)
    expect(lunrSearch('')).toBeInstanceOf(Promise)
    expect(lunrSearch('grandiosa')).toBeInstanceOf(Promise)
  })
  test('should find items by prefix', async () => {
    const {
      ok,
      data: results
    } = await lunrSearch('medister')
    expect(ok).toBeTruthy()
    expect(results.find(x => x.heading === 'Økologiske Medisterkaker')).toBeDefined()
  })
  test('should find items by suffix', async () => {
    const {
      ok,
      data: results
    } = await lunrSearch('kaker')
    expect(ok).toBeTruthy()
    expect(results.find(x => x.heading === 'Økologiske Medisterkaker')).toBeDefined()
  })
})