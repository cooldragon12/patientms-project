

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/overview",
        destination: `https://cooldragon12-ubiquitous-space-eureka-g57r6wgj4p5fpwg9-8000.preview.app.github.dev/patients/overview/`,
      },
    ];
  },
};
