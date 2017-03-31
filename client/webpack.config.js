var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports= {
  entry: {
    app:  './src/app.js',
    contact: './src/contact.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js' //bundle dinamic entry
  },
  module: {
    rules :[
      {
        test: /\.css$/, use: ['style-loader','css-loader','sass-loader']
      },
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test:/\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      { //not used
        test:/\.pug$/,  //to use pug template
        use: 'pug-html-loader'
      }
    ]
  },
  devServer :{ //server configuration
    contentBase: path.join(__dirname,'dist'),
    compress: true,
    hot:true, //to Hot module Replacement
    port: 9000,
    stats: "errors-only"
    //open: true open navegator in port
  },
  plugins: [
      new HtmlWebpackPlugin({ //template index
        title: 'Project Demo',
        minify:{
          collapseWhitespace: true
        },
        hash: true,
        excludeChunks: ['contact'],//exclude contact.js from index
        template: './src/index.html' //load a custom template

      }),
      new HtmlWebpackPlugin({ //second template
        title: 'Contact Page Demo',
        hash: true,
        chunks:['contact'],
        filename: 'contact.html',
        template: './src/contact.html' //load a custom template
      }),
      new webpack.HotModuleReplacementPlugin(), //auto-compile and reload styles
      new webpack.NamedModulesPlugin(),//auto-compile and reload styles

  ]

}
