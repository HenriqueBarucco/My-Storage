/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["github.com", "images.pexels.com", "media.karousell.com"],
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
    },
};

module.exports = nextConfig;
