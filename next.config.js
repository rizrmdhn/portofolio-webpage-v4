/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "fcxfu9avef.ufs.sh",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add a custom rule for .node files
    config.module.rules.push({
      test: /\.node$/,
      use: "file-loader",
    });

    // Ensure that .node files are correctly resolved
    config.resolve.extensions.push(".node");

    // Additional configurations for server-side
    if (isServer) {
      /**
       * @type {import('webpack').Configuration['externals']}
       */
      const externalsFunction = ({ request }, callback) => {
        if (request?.startsWith("@node-rs/argon2")) {
          return callback(null, "commonjs " + request);
        }
        callback();
      };

      config.externals = [...(config.externals || []), externalsFunction];
    }

    // Important: return the modified config
    return config;
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
