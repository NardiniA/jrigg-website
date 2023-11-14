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
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const { metadata } = settings;

  const newImage = generateMetaImage(metadata?.ogImage as Media);

  return {
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
    metadataBase: new URL(settings?.siteURL),
    creator: metadata?.author,
    publisher: metadata?.author,
    keywords: metadata?.keywords.map(({ name }: { name: string }) => name),
    colorScheme: "light",
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
    // TODO: Add icons list
    themeColor: "#023815",
    twitter: {
      card: "summary_large_image",
      title: metadata?.title,
      description: metadata?.description,
      images: [newImage?.url as string],
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      minimumScale: 1,
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
    assets: [newImage?.url?.replace(newImage?.filename as string, "") as string],
    category: "construction",
  };
}
