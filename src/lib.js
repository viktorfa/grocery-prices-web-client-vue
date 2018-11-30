export const formatPrice = price => price.toFixed(2).replace(".", ",")
export const parseQueryStringFromUrl = () =>
  decodeURIComponent(
    window.location.pathname.substring(
      window.location.pathname.lastIndexOf("sok/") + 4
    )
  );
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
        href: product.images.zoom,
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
    default:
      return product;
  }
}