import styles from "./header.module.scss";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Logo />
        <p>spacetraveling
          <span>.</span>
        </p>
      </div>
    </header>
  )
}

export const Logo = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.88103 0L0 11.5045L9.88103 23.007L12.2174 19.3298L5.55897 11.5025L12.2174 3.67523L9.88103 0ZM14.2051 22.7323H18.5415L25.4359 0.211919H21.0974L14.2051 22.7323ZM30.119 0L27.7826 3.6772L34.441 11.5045L27.7826 19.3318L30.119 23.009L40 11.5065L30.119 0Z" fill="#FF57B2" />
  </svg>
)

export default Header;
