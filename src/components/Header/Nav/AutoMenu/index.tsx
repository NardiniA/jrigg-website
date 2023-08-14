import SubMenu from "../SubMenu";
import Transport from "@/lib/transport";
import { NavTypes } from "../types";

const AutoMenu: React.FC<{ item: NavTypes }> = async ({ item }) => {
  if (!item?.auto?.name) return null;

  const transport = new Transport({
    collection: item?.auto?.name,
    query: {
      limit: 100_000,
    },
  });

  const docs = (await transport.get({ draftable: true })).value("docs");

  const formattedLinks = docs?.map(
    ({ slug, name }: { slug: string; name: string; }) => ({
      link: {
        type: "link",
        label: name,
        url: `${item?.auto?.baseURL}/${slug}`,
        newTab: false,
      },
    })
  );

  const merged = formattedLinks.concat(item?.auto?.sublink);

  const newItem: NavTypes = {
    ...item,
    type: "subMenu",
    subMenu: {
      sublink: merged,
    },
  }

  return <SubMenu item={newItem} />;
}

export default AutoMenu;
