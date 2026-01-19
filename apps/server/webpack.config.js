const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = function (options, webpack) {
  return {
    ...options,
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100', /^@teamlite\//],
      }),
    ],
    watchOptions: {
      ignored: /node_modules\/(?!@teamlite)/, // Ignore node_modules except @teamlite packages
    },
  };
};
