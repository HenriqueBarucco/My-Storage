/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["github.com", "images.pexels.com"],
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
    },
};

module.exports = nextConfig;
