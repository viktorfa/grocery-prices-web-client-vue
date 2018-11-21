export const formatPrice = price => price.toFixed(2).replace(".", ",")
export const parseQueryStringFromUrl = () =>
  decodeURIComponent(
    window.location.pathname.substring(
      window.location.pathname.lastIndexOf("sok/") + 4
    )
  );