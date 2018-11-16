import {
  staticUrl,
} from '../config/vars'

const getFullFileUrl = fileName => `${staticUrl}${fileName}`

export const getIndex = async () => {
  const fileName = 'lunr_index.json'
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
  const fileName = 'objects.json'
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