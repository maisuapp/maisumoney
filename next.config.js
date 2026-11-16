// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tailwind CSS v4 is compiled by the Turbopack loader during `next build`.
  // Keep the regular Next.js server output so `npm start` works on hosts that
  // run the package start script (standalone output requires a different
  // command and is not needed for a Vercel deployment).
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};
export default nextConfig;

