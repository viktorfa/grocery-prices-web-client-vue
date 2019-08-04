import isNumber from "lodash/isNumber";
import isNil from "lodash/isNil";

import { dealerLogos } from "@/constants/images";
import { SHOPGUN_URL } from "@/constants";

export const formatPrice = (price, suffix = ",-") => {
  if (isNumber(price)) {
    return `${price.toFixed(2).replace(".", ",")}${suffix}`;
  } else {
    return price;
  }
};

export const getProductValue = ({
  quantity_value,
  piece_value,
  quantity,
  pricing,
}) => {
  if (isNil(quantity)) return "";
  if (quantity_value)
    return formatPrice(
      quantity_value.value,
      ` kr/${quantity_value.unit.symbol}`,
    );
  if (piece_value)
    return formatPrice(piece_value.value, ` kr/${piece_value.unit.symbol}`);
  else if (quantity.size.max)
    return formatPrice(
      pricing.price / (quantity.size.max * quantity.unit.si.factor),
      ` kr/${quantity.unit.si.symbol}`,
    );
  else if (quantity.pieces.max)
    return formatPrice(pricing.price / quantity.pieces.max, " kr/stk");
  return "";
};

export const getDealerLogoSrc = (dealerName) => {
  return dealerLogos[dealerName];
};

export const getAmpShareUrlForProduct = ({ id }) =>
  `https://del.allematpriser.no/tilbud/${id}`;

export const getShopgunOfferCatalogUrl = ({ catalog_id, catalog_page }) =>
  `${SHOPGUN_URL}/publications/paged/${catalog_id}/pages/${catalog_page}`;

export const isProductUri = (string) => /\w+:product:\w+/gi.test(string);
