import { useStoreData } from "@shared/state/store"
import ThemeToggler from "@shared/ui/ThemeToggler"
import styles from "./ui/styles.module.css"

const Navbar = () => {
  const theme = useStoreData(state => state.theme)

  return (
    <header className={styles.navbar} data-theme={theme}>
      <section className="content-wrapper">
        <a className={styles.navbar__brand} href="/">
          <img
            src="/imageio-logo.webp"
            alt="Image IO logo"
            height="64"
            width="64"
          />
          <span>Image IO</span>
        </a>
        <section className={styles.navbar__actions}>
          <nav className={styles.navbar__nav}>
            <ul>
              <li>
                <a href="https://github.com/MarceloLopezS/image-converter-front-end">
                  About this project
                </a>
              </li>
            </ul>
          </nav>
          <section>
            <ThemeToggler className={styles["theme-toggler"]} />
          </section>
        </section>
      </section>
    </header>
  )
}

export default Navbar
