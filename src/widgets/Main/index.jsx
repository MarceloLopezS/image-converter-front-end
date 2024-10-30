import { useStoreData } from "@shared/state/store"
import styles from "./ui/styles.module.css"

const Main = ({ children, ...attributes }) => {
  const theme = useStoreData(state => state.theme)

  return (
    <main className={styles.main} data-theme={theme} {...attributes}>
      <div className="content-wrapper">{children}</div>
    </main>
  )
}

export default Main
