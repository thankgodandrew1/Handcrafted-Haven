/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn-icons-png.flaticon.com',
      'drive.google.com',
      'icon-library.com',
      'demos.creative-tim.com',
    ],
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    connectionString:
      'mongodb+srv://thankgodandrew663:xVJYcLzDDrnybFzo@cluster0.qwzwy2h.mongodb.net/HandcraftedHaven?retryWrites=true&w=majority',
    secret:
      'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDWFFJQkFBS0JnUUNrWndLTlMzU0V5RUhRNElLamh4UjF5alFrTkNPSVl6K3BNTHdud1hlSHkreWR5VGF1Cm5MMlBtTUVPSXc0bkRCSkpySGNGVWI3R3pjSVdGd0dNSHk2aWxRSFdaWnFSUkFmdklJVHE1TkNVSXFVMzNUcEoKajlDbElNNDEyL255V1Z5R2YrYml3eWErSWpKdUJEaHEwMDJyeHhVWGFtUzgzNWZtVEs3NkxkWVFmUUlEQVFBQgpBb0dCQUlNdno5R0FESktJV2p5YmFxT2kvcWlmbWN2cDd4QytZZVpZaFV3VURaWEhIQ0VzbHYzdkJUUzQ2QlNuCjFIdEVIck83YzU1REJNRVBIM2tSRXFNRm51ZS9IWHRBS1J6U3BGQm9HUldXelp2aytndDJDM0lPdy9hRTJCQ08KaVFUK3l0QUM0b0pnNU8zVU1FVWVsVWJRR0I1ZDlqZGRDWnhxa09iaVR1NXBlT1lCQWtFQS9GRUg1VHRuREhHRQorUG9UNDZwYkVMdW5UclpqdnJBV3FzN1J3a3lFZlo5YjVpbVhYQ0FvaWRFUWIreFdGRVpJNUtvYTNyVXBLeW5mCnkvME9jbnIxRVFKQkFLYk5iQm1EQXp1ZG13RzBjTjhRSDE0RGZOR2F4SVRGaE5LOVRINGVsdEtKY0kzNmhJWFAKYVdwVjRuL3IzNTNkTjNhcFlsbWg1d1U3eGhyc3FPdUhOSzBDUUZJanN2Vk9ORXJadmRjcjJrTzRWck1JMC91TQo1c1hTSDE3MXUxV01nV2svOHJQb0FFMU9ic1FHMmxvRlR6U0VlUUJ2M0JWNlZtK2x6eVJpT2t6TWVIRUNRSGdICkE4MkwxK3l6S1pKZGZJY1crK3RUeVNLdkl0Q0RyV05UOGxJaXd0YjNMWFlOR2dXTHpjaEZ5dm5RQ3BaM1UremcKVURROWE1YjVmMEZxb05ieThQVUNRUURNQzdGcFFsbG5jUGU5L2hDenVXTXg5QnoyLzVTU3R0NFFPRmF5alJscgplNUlzdU9xWkN4RE5qei9uM3JVclZXOGlYeTdhSnAwWEF5anJzVFcrejRSMQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ',
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api' // development api
        : 'http://localhost:3000/api', // production api
  },

  //   images: {
  //     remotePatterns: [
  //       {
  //         hostname: 'drive.google.com',
  //       },
  //     ],
  //   }
}

module.exports = nextConfig
