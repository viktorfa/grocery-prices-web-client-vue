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
