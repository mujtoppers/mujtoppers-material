/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  // Enable static optimization for better performance
  output: 'export', // Static export for CDN distribution
  
  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'docs.google.com',
      },
      {
        protocol: 'https',
        hostname: 'www.googleapis.com',
      },
    ],
  },
  
  // Headers for CSP and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://lh3.googleusercontent.com https://drive.google.com",
              "font-src 'self' data:",
              "connect-src 'self' https://www.googleapis.com https://drive.google.com https://docs.google.com",
              "frame-src 'self' https://drive.google.com https://docs.google.com",
              "media-src 'self' https://drive.google.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
  
  // Compression
  compress: true,
  
  // Production optimizations
  poweredByHeader: false,
  generateEtags: true,
  
  // Disable dev indicators in production
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
