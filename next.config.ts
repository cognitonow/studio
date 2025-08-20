
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
    // This is the correct way to fix the "Cannot find module './handlebars.runtime'" error.
    // It tells Webpack to treat 'handlebars' as an external module that will be required at runtime,
    // rather than trying to bundle it, which fixes the resolution issue on the server.
    if (isServer) {
        config.externals = [...config.externals, 'handlebars'];
    }

    config.module.noParse = /handlebars\.js$/;
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    config.resolve.alias['@opentelemetry/winston-transport'] = false;
    config.resolve.alias['@opentelemetry/exporter-jaeger'] = false;


    return config
  },
};

export default nextConfig;
