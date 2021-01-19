const webpack = require("webpack");
const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production", // 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。
  target: "browserslist",
  output: { filename: "[name].[chunkhash:8].js" },
  devtool: false,

  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "production",
    }),
  ],
});
