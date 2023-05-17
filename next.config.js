/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: "/todos",
                destination: "http://backend:3000/todos",
            },
        ];
    },
};
module.exports = nextConfig;