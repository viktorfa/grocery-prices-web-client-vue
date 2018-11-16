import lunr from 'lunr'

import kolonial_products from '../assets/kolonial_product_prices.json'
import shopgun_offers from '../assets/shopgun_offers.json'
import lunr_index from '../assets/lunr_index.json'
import old_objects from '../assets/objects.json'

export const createObjects = () => {
  const kolonial_objects = kolonial_products.reduce((acc, product) => ({ ...acc,
    [product.id]: product
  }), {})
  const shopgun_objects = shopgun_offers.reduce((acc, offer) => ({ ...acc,
    [offer.id]: offer
  }), {})
  return {
    ...kolonial_objects,
    ...shopgun_objects
  }
}

const createIndex = () => {
  return lunr(function () {
    this.field('title')
    this.ref('id')
    kolonial_products.forEach(product => {
      this.add({
        id: product.id,
        title: product.title,
      })
    })
    shopgun_offers.forEach(offer => {
      this.add({
        id: offer.id,
        title: offer.heading,
      })
    })
  })
}

export const index = lunr_index ? lunr.Index.load(lunr_index) : createIndex()


export const search = query => index.search(query)
export const tokens = Object.keys(index.invertedIndex)
export const objects = old_objects ? old_objects : createObjects()