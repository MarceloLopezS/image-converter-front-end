import { dispatch } from "@shared/state/store"
import { DELETE_FILE } from "@shared/state/config/actions"
import { formatBytes } from "@shared/utils/functions"
import DeleteSVG from "@shared/ui/SVGs/Delete"
import SettingsSVG from "@shared/ui/SVGs/Settings"
import styles from "./ui/styles.module.css"
import FileOutputSelect from "./ui/FileOutputSelect"

const handleSettingsClick = event => {} // TODO

const handleDeleteClick = fileName => () => {
  dispatch({ type: DELETE_FILE, payload: { fileName } })
}

const File = ({ inputFile, outputOptions, className }) => {
  return (
    <section
      className={`${styles["file-item"]}${className ? " " + className : ""}`}
    >
      <section className={styles["file-item__info"]}>
        <p>{inputFile.name}</p>
        <p className="text-secondary">{formatBytes(inputFile.size)}</p>
      </section>
      <section className={styles["file-item__actions"]}>
        <div className="flex sm-flex-column gap-50">
          <label htmlFor="output-format">Output: </label>
          <FileOutputSelect
            fileName={inputFile.name}
            outputOptions={outputOptions}
          />
        </div>
        <button onClick={handleSettingsClick} type="button">
          <SettingsSVG />
        </button>
        <button onClick={handleDeleteClick(inputFile.name)} type="button">
          <DeleteSVG />
        </button>
      </section>
    </section>
  )
}

export default File
