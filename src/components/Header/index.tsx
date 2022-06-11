import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/" passHref>
          <Image
            src="/Logo.png"
            alt="logo"
            height={25}
            width={238}
          />
        </Link>
      </div>
    </header>
  )
}

export default Header;
