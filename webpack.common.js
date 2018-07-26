/*
 *  webpack通用配置项
 * */
const path = require('path'); // 引入node 路径模块
const fs = require('fs');
const webpack = require('webpack'); // 加载webpack
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清楚缓存插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成index.html
const ROOT_PATH = path.resolve(__dirname); // 根目录
const ENTRY_PATH = './src/entries'; // 入口目录
const APP_PATH = ROOT_PATH + '/src';
const config = require(APP_PATH + '/config/config.dev.js') || {};
const HappyPack = require('happypack'); //happypack 优化
const os = require('os'); //node 系统模块
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 启动线程池});

const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 样式分离

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

// 分离第三方模块

const vendorConfig = require(APP_PATH + '/config/vendorConfig.js') || {};

const lessToJs = require('less-vars-to-js');

const themer = lessToJs(fs.readFileSync(path.join(APP_PATH, './resources/style/theme.less'), 'utf8'));
module.exports = {
    // 入口
    entry: {
        main: ENTRY_PATH + '/index.js'
    },
    // 出口
    output: {
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    // 模块解析方式
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 默认import的后缀名
        modules: ['node_modules', APP_PATH], // 默认的引入路径
        alias: { // 别名

        }
    },

    // 插件
    plugins: [
        new CleanWebpackPlugin(['build']), // 清理dist文件夹
        new HtmlWebpackPlugin({ // 自动生成新的dist文件内容及标题
            title: 'start',
            filename: 'index.html',
            template: ENTRY_PATH + '/index.html',
            hash: true
        })
    ].concat(
        Object.keys(vendorConfig).map(function (name) {
            return new webpack.DllReferencePlugin({
                context: ROOT_PATH,
                manifest: require.resolve(path.resolve(`./src/resources/js/lib/${name}-manifest.json`))
            });
        }),
        new AddAssetHtmlPlugin(Object.keys(vendorConfig).map(function (name) {
            return {
                filepath: require.resolve(path.resolve(`./src/resources/js/lib/${name}.js`)),
                includeSourcemap: false, // 默认是true.  当为true ， 插件会自动查找sourceMap文件
                hash: true
            };
        })),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        }),
        //自动加载模块
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),

        // HappyPack优化
        new HappyPack({
            id: 'jsx',
            threadPool: HappyThreadPool,
            loaders: ['babel-loader']
        }),
        // new BundleAnalyzerPlugin(),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        }),

        // 通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小，推荐使用
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new OpenBrowserPlugin({ url: `http://localhost:${config.proxy.port}` }), // 自动启动网页

        //定义全局变量
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true)
            // PRODUCTION: JSON.stringify(PRODUCTION),
            // APP_CONFIG: JSON.stringify(appConfig[process.env.NODE_ENV]),
        }),

        new CopyWebpackPlugin([
            {
                context: APP_PATH,
                from: 'resources/fonts',
                to: 'resources/fonts'
            },
            {
                context: APP_PATH,
                from: 'resources/images',
                to: 'resources/images'
            },
            {
                context: APP_PATH,
                from: 'resources/js/lib',
                ignore: ['*.json'] // 忽略文件
            },
        ])
    ),
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: {
                loader: 'happypack/loader?id=jsx'
            }
        }, {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                quiet: true
            }
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: false,
                        include: [
                            APP_PATH
                        ]
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        config: {
                            path: 'postcss.config.js' // 这个得在项目根目录创建此文件
                        }
                    }
                }]
            })
        }, {
            test: /\.less$/,
            exclude: path.resolve(__dirname, './node_modules'),
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader', // translates CSS into CommonJS
                options: {
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    config: {
                        path: 'postcss.config.js' // 这个得在项目根目录创建此文件
                    }
                }
            },
            {
                loader: 'less-loader'// compiles Less to CSS
            }]
        },
        {
            test: /\.less$/,
            include: path.resolve(__dirname, './node_modules'),
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        config: {
                            path: 'postcss.config.js' // 这个得在项目根目录创建此文件
                        }
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                        modifyVars: themer
                    }
                }]
            })
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            exclude: /node_modules/,
            use: [
                'file-loader'
            ]
        }
        ]
    }

};