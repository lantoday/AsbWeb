const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return {
    entry: {
      index: "./src/index.tsx",
    },
    mode: 'development',
    devtool: "source-map",
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /\.scss$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[local]-[hash:base64:5]",
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /.svg/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: { icon: true, typescript: true },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "index.css",
      }),

      new HtmlWebpackPlugin({
        template: __dirname + "/public/index.html",
      }),
    ],
    optimization: {
      minimize: false,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    output: {
      filename: "[name].js",
      assetModuleFilename: "[name].[ext]",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
  };
};
