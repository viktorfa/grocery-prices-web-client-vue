import _ from 'lodash'
import {
  getShopgunOfferCatalogUrl,
} from './helpers'

export const formatPrice = (price, suffix = ',-') => {
  if (_.isNumber(price)) {
    return `${price.toFixed(2).replace(".", ",")}${suffix}`
  } else {
    return price
  }
}
export const parseQueryStringFromUrl = () => {
  if (window.location.pathname.indexOf("sok/") !== -1) {
    return decodeURIComponent(
      window.location.pathname.substring(
        window.location.pathname.lastIndexOf("sok/") + 4
      )
    );
  }
  return null;
}
const intitialTitleText = document.querySelector("title") && document.querySelector("title").text;
export const setQueryStringInPage = query => {
  if (query && query.length > 0) {
    window.history.pushState({}, null, `/sok/${query}`);
    document.querySelector("title").text = `Priser på "${query}"`;
  } else {
    window.history.pushState({}, null, "/");
    document.querySelector("title").text = intitialTitleText;
  }
};

export const getProductValue = ({
  quantity_value,
  piece_value,
  quantity,
  pricing
}) => {
  if (_.isNil(quantity)) return ''
  if (quantity_value) return formatPrice(quantity_value.value, ` kr/${quantity_value.unit.symbol}`)
  if (piece_value) return formatPrice(piece_value.value, ` kr/${piece_value.unit.symbol}`)
  else if (quantity.size.max) return formatPrice(pricing.price / (quantity.size.max * quantity.unit.si.factor), ` kr/${quantity.unit.si.symbol}`)
  else if (quantity.pieces.max) return formatPrice(pricing.price / quantity.pieces.max, ' kr/stk')
  return ''
}


export const getStandardProduct = product => {
  switch (product.source) {
    case 'kolonial':
      return {
        title: product.heading,
        price: product.pricing.price,
        subtitle: product.description,
        description: product.description,
        dealer: product.dealer,
        href: product.href,
        image_url: product.image_url,
        id: product.uri,
        value: getProductValue(product),
      }
      case 'shopgun':
      return {
        value: getProductValue(product),
        title: product.heading,
        price: product.pricing.price,
        subtitle: product.dealer,
        description: product.description,
        dealer: product.dealer,
        href: product.href,
        image_url: product.image_url,
        id: product.uri,
      }
      case 'meny':
      return {
        value: getProductValue(product),
        title: product.heading,
        price: product.pricing.price,
        subtitle: product.description,
        description: product.description,
        dealer: product.dealer,
        href: product.href,
        image_url: product.image_url,
        id: product.uri,
      }
    case 'europris':
    return {
      value: getProductValue(product),
      title: product.heading,
      price: product.pricing.price,
      subtitle: product.description,
      description: product.description,
      dealer: product.dealer,
      href: product.href,
        image_url: product.image_url,
        id: product.uri,
      }
      case 'strapi':
      return {
        title: product.heading,
        price: product.price,
        subtitle: product.dealer_name,
        description: product.dealer_name,
        dealer: product.dealer_name,
        href: getShopgunOfferCatalogUrl(product),
        image_url: product.image_url,
        id: product.shopgun_id,
      }
    case 'custom':
      return {
        title: product.heading,
        price: product.price || product.price_text || '',
        subtitle: product.dealer_name,
        dealer: product.dealer_name,
        description: product.description,
        href: '#',
        image_url: product.image_url,
        id: product.id,
      }
    default:
      return product;
  }
}