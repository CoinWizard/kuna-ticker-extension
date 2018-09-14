import webpack from 'webpack';
import Path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const noop = () => null;

const PATH = {
    ROOT: __dirname,
    SOURCE: Path.join(__dirname, './src'),
    TARGET: Path.join(__dirname, './dist')
};

const ENV = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
};


const NODE_ENV = process.env.NODE_ENV || ENV.DEVELOPMENT;
const isProd = NODE_ENV === ENV.PRODUCTION;
const isBuild = process.env.BUILD === 'true';

const extractScss = new ExtractTextPlugin({
    filename: "../css/[name].css",
    disable: isBuild
});

const Plugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    }),
    new webpack.EnvironmentPlugin({
        NODE_ENV: NODE_ENV
    }),
    isProd ? new webpack.optimize.ModuleConcatenationPlugin() : noop,

    isProd ? new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: false
    }) : noop,

    extractScss
];

const Loaders = [{
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
    options: {
        // silent: true,
        configFile: Path.resolve(__dirname, 'tsconfig.json'),
        plugins: ['transform-decorators-legacy', 'transform-class-properties']
    }
}, {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules\/(?!(obs-store|etherscan-api))/,
    options: {
        presets: ['react', 'es2017', 'es2016', 'stage-0'],
        plugins: ['transform-decorators-legacy', 'transform-class-properties']
    }
}, {
    test: /\.scss$/,
    use: extractScss.extract({
        use: [{
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            options: {
                includePaths: [
                    Path.resolve(__dirname, './src/Style')
                ]
            }
        }],
        // use style-loader in development
        fallback: "style-loader"
    })
}];


const OptimisationProps = {
    minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: true,
                ecma: 6,
                mangle: false
            },
            sourceMap: true
        })
    ]
};


const WebpackConfig = {
    devtool: isProd ? false : 'source-map',

    context: PATH.SOURCE,

    node: {fs: 'empty'},

    entry: {
        popup: ["babel-polyfill", "extensionPopup"],
        pageContent: ["babel-polyfill", "pageContent"],
        background: ["babel-polyfill", "background"]
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
        path: Path.resolve(__dirname, './dist/chrome/js'),
        publicPath: '/js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [
            PATH.SOURCE,
            Path.resolve(__dirname, 'node_modules')
        ],
        alias: {
            Core: Path.join(__dirname, 'src/Core'),
            Popup: Path.join(__dirname, 'src/Popup'),
            background: Path.join(__dirname, 'src/background'),
            "page-content": Path.join(__dirname, 'src/page-content')
        }
    },

    plugins: Plugins,

    module: {rules: Loaders},

    devServer: {
        compress: true,
        historyApiFallback: true,
        stats: {
            children: false,
            chunks: false,
        },
        overlay: {
            warnings: true,
            errors: true
        }
    },

    stats: {
        children: false,
        chunks: false
    },

    optimization: isProd ? OptimisationProps : undefined,
    mode: isProd ? 'production' : 'development'
};

export default WebpackConfig;