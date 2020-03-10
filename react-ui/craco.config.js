const {
  getLoader,
  loaderByName,
  throwUnexpectedConfigError
} = require("@craco/craco");
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "../../theme.config$": require("path").join(
        __dirname,
        "/src/semantic-ui/theme.config"
      ),
      apollo: require("path").join(__dirname, "/src/apollo"),
      common: require("path").join(__dirname, "/src/common"),
      components: require("path").join(__dirname, "/src/components"),
      themes: require("path").join(__dirname, "/src/themes"),
      pages: require("path").join(__dirname, "/src/pages"),
      provider: require("path").join(__dirname, "/src/provider")
    },
    configure: {
      resolve: {
        modules: [path.resolve("./react-ui/src"), "node_modules"]
      }
    }
  },
  plugins: [
    { plugin: require("craco-less") },
    {
      plugin: {
        overrideWebpackConfig: ({ context, webpackConfig }) => {
          const { isFound, match: fileLoaderMatch } = getLoader(
            webpackConfig,
            loaderByName("file-loader")
          );

          if (!isFound) {
            throwUnexpectedConfigError({
              message: `Can't find file-loader in the ${
                context.env
              } webpack config!`
            });
          }

          fileLoaderMatch.loader.exclude.push(/theme.config$/);
          fileLoaderMatch.loader.exclude.push(/\.variables$/);
          fileLoaderMatch.loader.exclude.push(/\.overrides$/);

          return webpackConfig;
        }
      }
    }
  ]
};
