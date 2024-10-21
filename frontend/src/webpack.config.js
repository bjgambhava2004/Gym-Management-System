module.exports = {
    // other configurations
    module: {
      rules: [
        {
          test: /\.(avif|png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },
  };
  