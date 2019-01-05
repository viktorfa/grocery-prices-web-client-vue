const SHOPGUN_URL = 'https://shopgun.com'

export const getProductFromSearchResult = (result, objects) => ({
  ...objects[result.ref],
  id: result.ref,
  score: result.score
})

export const bestOfferToOffer = ([id, offer]) => ({
  ...offer,
  score: offer.rebate,
  source: "shopgun",
  id
})

export const getShopgunOfferCatalogUrl = ({catalog_id, catalog_page}) => `${SHOPGUN_URL}/publications/paged/${catalog_id}/pages/${catalog_page}`
