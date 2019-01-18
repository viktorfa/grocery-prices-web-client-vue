const STRAPI_URL = 'https://strapi.vikfand.com'
import {
  getJsonFetchOption,
  getFullFileUrl
} from './util'

export const getIndex = async () => {
  const fileName = 'lunr-index-latest.json'
  const response = await fetch(getFullFileUrl(fileName))
  return getJsonFetchOption(response)
}

export const getAutocompleteData = async () => {
  const fileName = 'autocomplete-data-latest.json'
  const response = await fetch(getFullFileUrl(fileName))
  return getJsonFetchOption(response)
}

export const getObjects = async () => {
  const fileName = 'objects-latest.json'
  const response = await fetch(getFullFileUrl(fileName))
  return getJsonFetchOption(response)
}

export const getPromotedOffers = async (offerLimit = 30) => {
  const isoNow = new Date().toISOString()
  const strapiCollectionName = 'selectedoffers'
  const strapiUrlParameterString = `run_till_gt=${isoNow}&run_from_lt=${isoNow}&_limit=${offerLimit}&_sort=select_method:DESC`
  const response = await fetch(`${STRAPI_URL}/${strapiCollectionName}?${strapiUrlParameterString}`)
  return getJsonFetchOption(response)
}

export const searchCustomOffers = async (query, offerLimit = 10) => {
  const isoNow = new Date().toISOString()
  const strapiCollectionName = 'customoffers'
  const strapiUrlParameterString = `heading_contains=${query}&run_till_gt=${isoNow}&run_from_lt=${isoNow}&_limit=${offerLimit}&_sort=updatedAt:DESC`
  const response = await fetch(`${STRAPI_URL}/${strapiCollectionName}?${strapiUrlParameterString}`)
  return getJsonFetchOption(response)
}