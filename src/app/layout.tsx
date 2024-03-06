import "./globals.scss";
import "boxicons/css/boxicons.min.css";
import "aos/dist/aos.css";
import { inter, pt_serif } from "./fonts";
import { classes } from "@/utilities/classes";
import type { Children } from "@/types/children";
import Providers from "./Providers";
import Header from "@/components/Header";
import { getSettings } from "@/lib/getSettings";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Media } from "@/types/payload-types";
import { generateMetaImage } from "@/utilities/generateMetaImage";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default async function layout({ children }: Children) {
  const settings = await getSettings({ draftable: true });

  return (
    <html
      lang="en"
      className={classes(
        inter?.variable as string,
        pt_serif?.variable as string
      )}
    >
      <body>
        <Providers>
          <main className="page">
            <Header data={settings} />
            <main className="main">
              {children}
              <Footer />
            </main>
          </main>
          
          <noscript>
            <style type="text/css">
              {`
                [data-aos] {
                  transition-duration: 0 !important;
                  transition-delay: 0 !important;
                  transform: translate(0, 0) !important;
                  -webkit-transform: translate(0, 0) !important;
                  opacity: 1 !important;
                }
              `}
            </style>
          </noscript>
        </Providers>
        <Analytics />
	<SpeedInsights />
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const { metadata } = settings;

  const newImage = generateMetaImage(metadata?.ogImage as Media);

  return {
    metadataBase: new URL(settings?.siteURL),
    title: {
      default: `${metadata?.title} ${metadata?.suffix}`,
      template: `%s ${metadata?.suffix}`,
    },
    description: metadata?.description,
    authors: [
      {
        name: "Antonio Nardini",
        url: "https://antonionardini.com",
      },
      {
        name: metadata?.author,
      },
    ],
    creator: metadata?.author,
    publisher: metadata?.author,
    keywords: metadata?.keywords.map(({ name }: { name: string }) => name),
    applicationName: "J. Rigg Construction",
    openGraph: {
      title: metadata?.title,
      description: metadata?.description,
      url: settings?.siteURL,
      siteName: settings?.sitename,
      images: [
        {
          url: newImage?.url as string,
          width: newImage?.width,
          height: newImage?.height,
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    icons: {
      icon: [
        {
          url: "/favicon-16x16.png",
          type: "image/png",
          sizes: "16x16",
        },
        {
          url: "/favicon-32x32.png",
          type: "image/png",
          sizes: "32x32",
        },
        {
          url: "/favicon-96x96.png",
          type: "image/png",
          sizes: "96x96",
        },
        {
          url: "/ms-icon-144x144.png",
          type: "image/png",
          sizes: "144x144",
        },
        {
          url: "/android-icon-192x192.png",
          type: "image/png",
          sizes: "192x192",
        },
      ],
      shortcut: [
        {
          url: "/favicon-16x16.png",
          type: "image/png",
          sizes: "16x16",
        },
        {
          url: "/favicon-32x32.png",
          type: "image/png",
          sizes: "32x32",
        },
        {
          url: "/favicon-96x96.png",
          type: "image/png",
          sizes: "96x96",
        },
      ],
      apple: [
        {
          url: "/apple-icon-57x57.png",
          type: "image/png",
          sizes: "57x57",
        },
        {
          url: "/apple-icon-60x60.png",
          type: "image/png",
          sizes: "60x60",
        },
        {
          url: "/apple-icon-72x72.png",
          type: "image/png",
          sizes: "72x72",
        },
        {
          url: "/apple-icon-76x76.png",
          type: "image/png",
          sizes: "76x76",
        },
        {
          url: "/apple-icon-114x114.png",
          type: "image/png",
          sizes: "114x114",
        },
        {
          url: "/apple-icon-120x120.png",
          type: "image/png",
          sizes: "120x120",
        },
        {
          url: "/apple-icon-144x144.png",
          type: "image/png",
          sizes: "144x144",
        },
        {
          url: "/apple-icon-152x152.png",
          type: "image/png",
          sizes: "152x152",
        },
        {
          url: "/apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180",
        },
      ],
    },
    // // TODO: Add icons list
    twitter: {
      card: "summary_large_image",
      title: metadata?.title,
      description: metadata?.description,
      images: [newImage?.url as string],
    },
    appleWebApp: {
      title: settings?.sitename,
      statusBarStyle: "black-translucent",
    },
    appLinks: {
      web: {
        url: settings?.siteURL,
        should_fallback: true,
      },
    },
    category: "construction",
  };
}

export function generateViewport() {
  return {
    themeColor: "#023815",
    colorScheme: "light",
    viewport: {
      width: "device-width",
      initialScale: 1,
      minimumScale: 1,
    },
  }
}
