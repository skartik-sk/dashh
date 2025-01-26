/** @type {import('next').NextConfig} */
const nextConfig = 
{
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this with your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET, DELETE, PATCH, POST, PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Content-Length, Content-MD5, X-Api-Version" }
                ]
            }
        ]
    },
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
            
          ],
    },

}

export default nextConfig;
