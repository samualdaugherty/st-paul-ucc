import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenuHandler from "@/components/MobileMenuHandler";
import "./globals.css";

export const metadata: Metadata = {
  title: "St. Paul United Church of Christ | Pekin IL",
  description: "As a congregation of Christ's people, we are called to demonstrate and share God's word of love, peace, mercy, and justice with all those whose lives we touch and welcome them into Christian fellowship.",
  openGraph: {
    title: "St. Paul United Church of Christ | Pekin IL",
    description: "As a congregation of Christ's people, we are called to demonstrate and share God's word of love, peace, mercy, and justice with all those whose lives we touch and welcome them into Christian fellowship.",
    images: [
      {
        url: "https://uploads-ssl.webflow.com/5de47e9259d27bdbfd2e2fb6/5ec301685456e959a8a70012_Social-Share.png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Paul United Church of Christ | Pekin IL",
    description: "As a congregation of Christ's people, we are called to demonstrate and share God's word of love, peace, mercy, and justice with all those whose lives we touch and welcome them into Christian fellowship.",
    images: ["https://uploads-ssl.webflow.com/5de47e9259d27bdbfd2e2fb6/5ec301685456e959a8a70012_Social-Share.png"],
  },
  icons: {
    icon: "/images/favicon.jpg",
    apple: "/images/webclip.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Webflow CSS in exact order from original HTML */}
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/components.css" />
        <link rel="stylesheet" href="/css/st-paul-ucc.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          strategy="beforeInteractive"
        />
        <Script id="webfont-loader" strategy="beforeInteractive">
          {`WebFont.load({ google: { families: ["Oswald:200,300,400,500,600,700", "Droid Serif:400,400italic,700,700italic", "Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic", "Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic", "Merriweather:300,300italic,400,400italic,700,700italic,900,900italic", "Abril Fatface:regular:latin-ext,latin"] } });`}
        </Script>
        <Script id="webflow-init" strategy="beforeInteractive">
          {`!function (o, c) { var n = c.documentElement, t = " w-mod-"; n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch") }(window, document);`}
        </Script>
      </head>
      <body className="body">
        <MobileMenuHandler />
        <Header />
        {children}
        <Footer />
        {/* 
          Note: We've removed the 14k-line Webflow.js file to simplify the site.
          All styling is preserved via the original CSS files.
          Navigation and interactions work via standard HTML/CSS.
        */}
      </body>
    </html>
  );
}
