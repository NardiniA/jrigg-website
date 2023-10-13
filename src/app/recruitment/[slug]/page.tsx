import styles from "./index.module.scss";
import Banner from "@/app/(pages)/[...slug]/hero/Banner";
import RichText from "@/components/RichText";
import Transport from "@/lib/transport";
import { Page, Recruitment } from "@/types/payload-types";
import { SegmentProps } from "@/types/segment-props";
import { notFound } from "next/navigation";
import Share from "./Share";
import { Metadata } from "next";
import Form from "./Form";

type BannerProps = {
  hero: Page["hero"]["banner"];
  breadcrumbs: { label: string; url: string; id: string }[];
};

const transport = ({ slug }: SegmentProps["params"]) => {
  return new Transport({
    collection: "recruitment",
    query: {
      where: {
        slug: {
          equals: slug,
        },
      },
    },
  });
}

export default async function Slug({ params }: SegmentProps) {
  const recruitment: Recruitment = (await transport(params).get({ draftable: true })).toSingle();

  if (!recruitment) return notFound();

  const bannerData: BannerProps = {
    hero: {
      title: recruitment?.title,
    },
    breadcrumbs: [
      {
        label: "Recruitment",
        url: "/recruitment",
        id: "",
      },
      {
        label: recruitment?.title,
        url: `/recruitment/${recruitment?.slug}`,
        id: recruitment?.id,
      },
    ],
  };

  return (
    <>
      <Banner {...bannerData} />
      <section className="section">
        <div className="container">
          <RichText content={recruitment?.details} className={styles["recruitment-content"]} />
          <Share title={recruitment?.title} slug={recruitment?.slug as string} />
        </div>
      </section>
      <section className="section bg-primary-darker">
        <div className="container">
          <div className="row">
            <div>
              <h2 style={{ marginBottom: "3rem" }}>Application Form</h2>
            </div>
          </div>
          <Form />
        </div>
      </section>
    </>
  )
}

export async function generateStaticParams() {
  const transport = new Transport({
    collection: "recruitment",
    query: {
      limit: 100_000,
    },
  });

  const jobs = (await transport.get()).value("docs");

  return jobs?.map(({ slug }: { slug: string }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: SegmentProps): Promise<Metadata> {
  const job: Recruitment = (await transport(params).get()).toSingle();

  if (!job) return {};

  return {
    title: job?.title,
    description: job?.description,
    openGraph: {
      title: job?.title,
      description: job?.description,
      url: `/recruitment/${job?.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: job?.title,
      description: job?.description,
    },
  };
}
