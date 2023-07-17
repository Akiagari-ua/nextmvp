/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        config.module.rules.push({
          test: /\.(graphql|gql)/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader"
        });
    
        return config;
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 's4.anilist.co',
          },
        ],
      },
}

module.exports = nextConfig
