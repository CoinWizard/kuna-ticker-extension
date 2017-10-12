import Webpack from 'webpack';
import Path from 'path';
import Autoprefixer from 'autoprefixer';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

const PATH = {
    ROOT: __dirname,
    SOURCE: Path.join(__dirname, './src'),
    TARGET: Path.join(__dirname, './dist')
};

const Plugins = [
    new Webpack.NamedModulesPlugin(),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // add errors to webpack instead of warnings
        failOnError: true
    }),
    new Webpack.optimize.CommonsChunkPlugin({async: true})
];


if (true) {
    Plugins.push(
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                conditionals: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                if_return: true,
                join_vars: true,
                screw_ie8: true,
                warnings: false,
                evaluate: true,
                unused: true,
            },
            output: {
                comments: false
            }
        })
    );
}

const Loaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
            presets: ['react', 'es2015', 'stage-0']
        }
    }, {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
            presets: ['react', 'es2015', 'stage-0']
        }
    }
];


const WebpackConfig = {
    context: PATH.TARGET,
    node: {
        fs: 'empty' // avoids error messages
    },
    output: {
        filename: "js/[name].js"
    },
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [
            PATH.SOURCE,
            Path.resolve(__dirname, 'node_modules')
        ]
    },
    devtool: 'inline-source-map',
    plugins: Plugins,
    module: {
        loaders: Loaders
    },
    stats: {
        children: false
    }
};

export default WebpackConfig;