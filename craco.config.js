const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new GenerateSW({
          clientsClaim: true,
          skipWaiting: false, // Let the user decide when to update
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
          exclude: [
            /\.map$/,
            /asset-manifest\.json$/,
            /LICENSE/,
          ],
          // Precache all navigation requests
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [
            // Exclude URLs starting with /api
            new RegExp('^/api/'),
          ],
        }),
      ],
    },
  },
};
