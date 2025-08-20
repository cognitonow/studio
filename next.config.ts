
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (
    config,
    { isServer }
  ) => {
    // Add a rule to handle the handlebars dependency issue with Genkit
    // This prevents the Next.js compiler from crashing when it encounters this file.
    config.module.noParse = /handlebars\.js$/;
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    // Add rules to ignore missing optional dependencies
    config.resolve.alias['@opentelemetry/winston-transport'] = false;
    config.resolve.alias['@opentelemetry/exporter-jaeger'] = false;


    return config
  },
};

export default nextConfig;
