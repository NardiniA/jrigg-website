import Wrapper from "./Client/Wrapper";
import Logo from "./Logo";
import Nav from "./Nav";
import Toggle from "./Toggle";
import styles from "./index.module.scss";
import type { Setting } from "@/types/payload-types";

const Header: React.FC<{ data: Setting }> = ({ data }) => {
  return (
    <Wrapper>
      <div className={styles["nav-header"]}>
        <Logo image={data?.logo} />

        <Toggle />
      </div>

      <div className={styles["overflow-block"]}></div>

      <Nav navigation={data?.navigation?.items} social={data?.social?.social} />
    </Wrapper>
  )
}

export default Header;
