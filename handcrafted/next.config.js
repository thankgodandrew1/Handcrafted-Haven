/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
images : {
  domains: ['cdn-icons-png.flaticon.com', 'drive.google.com', 'icon-library.com']
}
//   images: {
//     remotePatterns: [
//       {
//         hostname: 'drive.google.com',
//       },
//     ], 
//   }
};

module.exports = nextConfig;