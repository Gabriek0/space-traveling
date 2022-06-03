import styles from "./header.module.scss";
import Image from "next/image";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/Logo.png"
          alt="logo"
          height={25}
          width={238}
        />
      </div>
    </header>
  )
}

export default Header;
