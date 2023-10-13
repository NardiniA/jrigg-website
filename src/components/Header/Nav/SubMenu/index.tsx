import styles from "../index.module.scss";
import { classes } from "@/utilities/classes";
import { parseLink } from "@/utilities/parseLink";
import Link from "next/link";
import { NavTypes } from "../types";
import { ContentContainer, Toggler, Wrapper } from "./Client";

const SubMenu: React.FC<{
  item: NavTypes;
}> = ({ item }) => {
  if (!!item?.subMenu?.sublink?.length)
    return (
      <li className={classes(styles["nav-item"], styles["dropdown"])}>
        <Wrapper>
          <Toggler
            htmlElement="span"
            className={styles["dropdown-header"]}
            title={`Open the ${item?.label} dropdown menu`}
          >
            {item?.label}
            <i
              className={classes(
                "bx bx-chevron-down",
                styles["dropdown-toggle"]
              )}
            ></i>
          </Toggler>
          <ContentContainer>
            <ul className={styles["dropdown-menu"]}>
              {item?.subMenu?.sublink?.map(({ link, id }, idx) => (
                <li
                  className={styles["dropdown-item"]}
                  key={(id || idx) + (link?.type || "submenu_drop") + idx}
                >
                  <Link
                    href={parseLink(link)}
                    className={styles["nav-link"]}
                    title={`Go to the ${link?.label} page`}
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ContentContainer>
        </Wrapper>
      </li>
    );

  return null;
};

export default SubMenu;
