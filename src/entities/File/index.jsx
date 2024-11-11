import { dispatch } from "@shared/state/store"
import {
  DELETE_FILE,
  SET_CURRENT_FILE_TO_CONFIG
} from "@shared/state/config/actions"
import { formatBytes } from "@shared/utils/functions"
import DeleteSVG from "@shared/ui/SVGs/Delete"
import SettingsSVG from "@shared/ui/SVGs/Settings"
import FileOutputSelect from "./ui/FileOutputSelect"
import styles from "./ui/styles.module.css"

const handleSettingsClick = fileName => () => {
  dispatch({ type: SET_CURRENT_FILE_TO_CONFIG, payload: { fileName } })
}

const handleDeleteClick = fileName => () => {
  dispatch({ type: DELETE_FILE, payload: { fileName } })
}

const File = ({ inputFile, outputOptions, className, ...attributes }) => {
  return (
    <section
      className={`${styles["file-item"]}${className ? " " + className : ""}`}
      {...attributes}
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
        <button onClick={handleSettingsClick(inputFile.name)} type="button">
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
