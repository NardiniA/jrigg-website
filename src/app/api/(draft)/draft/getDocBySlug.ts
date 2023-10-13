import Transport from "@/lib/transport";

export const getDocBySlug = async (collection: string, slug: string): Promise<any> => {
  try {
    const transport = new Transport({
      collection: collection,
      query: {
        where: {
          slug: {
            equals: slug,
          },
        },
      },
    });

    const doc = (await transport.get()).toSingle();

    if (!doc) throw new Error(`No document found - ${collection} - ${slug} | Draft Mode`);

    return doc;
  } catch (err) {
    console.error(err);
    return null;
  }
}
