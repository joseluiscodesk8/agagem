/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['jsx'],
  images: {
    domains: ['i.ibb.co'], // Agrega el dominio de imgur aquí
  },
}
module.exports = {
  webpack(config, options) {
      config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
              loader: 'url-loader',
              options: {
                  limit: 100000
              }
          }
      });

      return config;
  },
  async rewrites() {
    return [
      {
        source: '/carrito',
        destination: '/Carrito', // Nombre de la página de carrito (debe coincidir con el nombre del archivo)
      },
    ];
  },
  ...nextConfig,
};