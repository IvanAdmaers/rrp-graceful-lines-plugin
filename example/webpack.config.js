const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new MiniCssExtractPlugin({
    filename: isProduction === true ? '[name].[contenthash].css' : '[name].css',
  }),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico',
  }),
];

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction === true ? '[name].[fullhash].js' : '[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: ['./dist'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico|mp3)$/i,
        type: isProduction === true ? 'asset' : 'asset/resource',
      },
    ],
  },
  plugins,
};
