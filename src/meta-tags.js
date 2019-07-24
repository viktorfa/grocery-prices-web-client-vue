import { formatPrice } from "./lib";

export const imageTags = [
  {
    key: "image",
    name: "image",
  },
  {
    key: "schema:image",
    itemprop: "image",
  },
  {
    key: "twitter:image",
    name: "twitter:image:src",
  },
  {
    key: "og:image",
    property: "og:image",
  },
];
export const titleTags = [
  {
    key: "schema:name",
    itemprop: "name",
  },
  {
    key: "twitter:title",
    name: "twitter:title",
  },
  {
    key: "og:title",
    property: "og:title",
  },
];
export const descriptionTags = [
  {
    key: "description",
    name: "description",
  },
  {
    key: "schema:description",
    itemprop: "description",
  },
  {
    key: "twitter:description",
    name: "twitter:card",
  },
  {
    key: "og:description",
    property: "og:description",
  },
];
export const urlTags = [
  {
    key: "og:url",
    property: "og:url",
  },
];
export const getAllMetaTags = ({ title, description, image_url, site_url }) => {
  return [
    ...titleTags.map((x) => ({
      ...x,
      content: title,
    })),
    ...descriptionTags.map((x) => ({
      ...x,
      content: description,
    })),
    ...imageTags.map((x) => ({
      ...x,
      content: image_url,
    })),
    ...urlTags.map((x) => ({
      ...x,
      content: site_url,
    })),
    {
      key: "twitter:card",
      name: "twitter:card",
      content: "summary",
    },
    {
      key: "og:locale",
      property: "og:locale",
      content: "nb_NO",
    },
    {
      key: "og:type",
      property: "og:type",
      content: "website",
    },
  ];
};

export const getProductDescription = ({ description, price, dealer }) => {
  const resultStrings = [];
  if (description) {
    resultStrings.push(description);
  }
  if (dealer) {
    resultStrings.push(dealer);
  }
  if (price) {
    resultStrings.push(formatPrice(price));
  }
  return `${resultStrings.join(" – ")}. Finn priser på alle varer og tilbud.`;
};

export const getAllMetaInfoForProduct = (product) => {
  const title = product.title;
  const description = getProductDescription(product);
  const image_url = product.image_url;
  const site_url = `https://allematpriser.no/tilbud/${product.id}`;
  return {
    title,
    meta: getAllMetaTags({ title, description, image_url, site_url }),
  };
};
