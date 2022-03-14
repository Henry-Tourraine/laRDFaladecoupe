/** @type {import('next').NextConfig} */
const nextConfig = {

  distDir: 'build',

  experimental: {
    concurrentFeatures: true,
  },
  reactStrictMode: true,
  env: { MONGO_URI: "mongodb+srv://JusteLeBlanc:Parcequecestmonprojet777@cluster0.fype8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", address_contract: "0xe4C475A4D8a20CbF2d84b30F39cccFFBf6D7679E" }
}

module.exports = nextConfig
