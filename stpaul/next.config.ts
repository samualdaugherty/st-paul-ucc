import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/calendar.html',
        destination: '/calendar',
        permanent: true,
      },
      {
        source: '/worship-spiritual-life.html',
        destination: '/worship-spiritual-life',
        permanent: true,
      },
      {
        source: '/community-outreach.html',
        destination: '/community-outreach',
        permanent: true,
      },
      {
        source: '/contact-us.html',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/leadership.html',
        destination: '/leadership',
        permanent: true,
      },
      {
        source: '/licensing.html',
        destination: '/licensing',
        permanent: true,
      },
      {
        source: '/special-music.html',
        destination: '/special-music',
        permanent: true,
      },
      {
        source: '/our-events.html',
        destination: 'https://www.eventbrite.com/o/st-paul-ucc-pekin-20138483458',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
