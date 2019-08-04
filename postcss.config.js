const purgecss = require("@fullhuman/postcss-purgecss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    autoprefixer({
      add: true,
      grid: true,
    }),
    //Only add purgecss in production
    process.env.NODE_ENV === "production"
      ? purgecss({
          whitelistPatterns: [/^v-/, /^theme--/, /--text$/],
          defaultExtractor: (content) =>
            content.match(/[A-Za-z0-9-_:/]+/g) || [],
          content: [
            "./src/**/*.html",
            "./src/**/*.vue",
            "./public/**/*.html",
          ].filter(function(f) {
            return !/\/$/.test(f);
          }),
        })
      : "",
  ],
};
