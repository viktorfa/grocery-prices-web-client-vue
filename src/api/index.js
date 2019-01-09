import {
  staticUrl,
} from '../config/vars'

const getFullFileUrl = fileName => `${staticUrl}${fileName}`
const STRAPI_URL = 'https://strapi.vikfand.com'

export const getIndex = async () => {
  const fileName = 'lunr-index-latest.json'
  const response = await fetch(getFullFileUrl(fileName))
  if (response.ok) {
    const jsonBody = await response.json()
    return {
      ok: true,
      data: jsonBody
    }
  } else {
    return {
      ok: false,
      error: response.error
    }
  }
}

export const getObjects = async () => {
  const fileName = 'objects-latest.json'
  const response = await fetch(getFullFileUrl(fileName))
  if (response.ok) {
    const jsonBody = await response.json()
    return {
      ok: true,
      data: jsonBody
    }
  } else {
    return {
      ok: false,
      error: response.error
    }
  }
}

export const getPromotedOffers = async (offerLimit=30) => {
  const isoNow = new Date().toISOString()
  const strapiCollectionName = 'selectedoffers'
  const strapiUrlParameterString = `run_till_gt=${isoNow}&run_from_lt=${isoNow}&_limit=${offerLimit}&_sort=updatedAt:DESC`
  const response = await fetch(`${STRAPI_URL}/${strapiCollectionName}?${strapiUrlParameterString}`)
  if (response.ok) {
    const jsonBody = await response.json()
    return {
      ok: true,
      data: jsonBody
    }
  } else {
    return {
      ok: false,
      error: response.error
    }
  }
}

export const searchCustomOffers = async (query, offerLimit=10) => {
  const isoNow = new Date().toISOString()
  const strapiCollectionName = 'customoffers'
  const strapiUrlParameterString = `heading_contains=${query}&run_till_gt=${isoNow}&run_from_lt=${isoNow}&_limit=${offerLimit}&_sort=updatedAt:DESC`
  const response = await fetch(`${STRAPI_URL}/${strapiCollectionName}?${strapiUrlParameterString}`)
  if (response.ok) {
    const jsonBody = await response.json()
    return {
      ok: true,
      data: jsonBody
    }
  } else {
    return {
      ok: false,
      error: response.error
    }
  }
}