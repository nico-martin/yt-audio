const path = require('path');

module.exports = {
  plugins: [
    [
      'postcss-mixins',
      {
        mixinsDir: path.join(__dirname, 'src/styles/mixins'),
      },
    ],
    'postcss-nested',
    'autoprefixer',
    'postcss-preset-env',
  ],
};
