/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        mdxRs: true,
        serverComponentsExternalPackages: ['mongoose']
    },
    images: {
        domains: ["picsum.photos"]
    }
}

module.exports = nextConfig
