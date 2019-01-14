import _ from 'lodash'
import {
  getShopgunOfferCatalogUrl,
} from './helpers'

export const formatPrice = price => {
  if (_.isNumber(price)) {
    return `${price.toFixed(2).replace(".", ",")},-`
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
const intitialTitleText = document.querySelector("title").text;
export const setQueryStringInPage = query => {
  if (query && query.length > 0) {
    window.history.pushState({}, null, `/sok/${query}`);
    document.querySelector("title").text = `Priser på "${query}"`;
  } else {
    window.history.pushState({}, null, "/");
    document.querySelector("title").text = intitialTitleText;
  }
};


export const getStandardProduct = product => {
  switch (product.source) {
    case 'kolonial':
      return {
        title: product.title,
        price: product.price,
        subtitle: product.product_variant,
        href: product.product_url,
        image_url: product.image_url,
        id: product.id,
      }
    case 'shopgun':
      return {
        title: product.heading,
        price: product.pricing.price,
        subtitle: product.branding.name,
        href: getShopgunOfferCatalogUrl(product),
        image_url: product.images.view,
        id: product.id,
      }
    case 'meny':
      return {
        title: product.title,
        price: product.price,
        subtitle: product.product_variant,
        href: product.product_url,
        image_url: product.image_url,
        id: product.id,
      }
    case 'europris':
      return {
        title: product.name,
        price: product.price,
        subtitle: product.description,
        href: product.link,
        image_url: product.image_url,
        id: product.id,
      }
    case 'strapi':
      return {
        title: product.heading,
        price: product.price,
        subtitle: product.dealer_name,
        href: getShopgunOfferCatalogUrl(product),
        image_url: product.image_url,
        id: product.shopgun_id,
      }
    case 'custom':
      return {
        title: product.heading,
        price: product.price || product.price_text || '',
        subtitle: product.dealer_name,
        href: '#',
        image_url: product.image_url,
        id: product.id,
      }
    default:
      return product;
  }
}