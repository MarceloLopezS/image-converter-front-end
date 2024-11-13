import { useStoreData } from "@shared/state/store"
import styles from "./ui/styles.module.css"

const FileConfigControl = () => {
  const files = useStoreData(state => state.files)
  const currentFileToConfig = useStoreData(state => state.currentFileToConfig)

  const filesLength = files.length

  return (
    <section className={styles["file-config-container"]}>
      <section
        className={styles["file-config__header"]}
        data-current-file-to-config={
          currentFileToConfig ? currentFileToConfig : null
        }
      >
        <p>
          {filesLength > 0
            ? (currentFileToConfig && `Settings for ${currentFileToConfig}:`) ||
              `Settings for all (${filesLength}) files:`
            : "Settings:"}
        </p>
      </section>
      <section className={styles["file-config__body"]}>
        {filesLength === 0 ? (
          <p className="text-center">Choose some files first.</p>
        ) : (
          <section></section>
        )}
      </section>
    </section>
  )
}

export default FileConfigControl
