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
          content: ["./src/**/*.html", "./src/**/*.vue"],
        })
      : "",
  ],
};
