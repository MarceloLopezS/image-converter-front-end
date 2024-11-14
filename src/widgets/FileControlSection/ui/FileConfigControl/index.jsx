import { useStoreData } from "@shared/state/store"
import { getFilesSettingsWarning } from "@shared/utils/functions"
import styles from "./ui/styles.module.css"

const FileConfigControl = () => {
  const files = useStoreData(state => state.files)
  const filesConfig = useStoreData(state => state.filesConfig)
  const currentFileToConfig = useStoreData(state => state.currentFileToConfig)

  const filesLength = files.length
  const warningMessage = getFilesSettingsWarning(
    filesLength,
    filesConfig,
    currentFileToConfig
  )

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
        {warningMessage ? (
          <p className="text-secondary">{warningMessage}</p>
        ) : (
          <section></section>
        )}
      </section>
    </section>
  )
}

export default FileConfigControl
