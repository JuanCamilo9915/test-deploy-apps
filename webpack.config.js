const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    //entry: './src/db.ts',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            include: [path.resolve(__dirname, 'src')]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'main.js',
        //filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
};