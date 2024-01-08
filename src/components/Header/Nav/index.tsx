import { Setting } from "@/types/payload-types";
import styles from "./index.module.scss";
import dynamic from "next/dynamic";
import { DynamicSelector } from "@/types/dynamic-selector";
import Social from "./Social";

const links: DynamicSelector = {
  link: dynamic(() => import("./NavLink"), { ssr: false }),
  subMenu: dynamic(() => import("./SubMenu"), { ssr: false }),
  auto: dynamic(() => import("./AutoMenu"), { ssr: false }),
};

const Nav: React.FC<{ navigation: Setting["navigation"]["items"], social: Setting["social"]["social"] }> = ({ navigation, social }) => {
  if (!!navigation?.length) return (
    <nav className={styles["nav"]}>
      <div>
        <ul>
          {navigation?.map((item, index) => {
            const Comp = links[item?.type];

            return <Comp item={item} key={item?.type + index} />
          })}
        </ul>
      </div>

      <Social social={social} />
    </nav>
  );

  return null;
}

export default Nav;
