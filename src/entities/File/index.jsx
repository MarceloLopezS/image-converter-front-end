import { isValidElement } from "react"
import { dispatch, useStoreData } from "@shared/state/store"
import {
  DELETE_FILE,
  SET_CURRENT_FILE_TO_CONFIG
} from "@shared/state/config/actions"
import { formatBytes } from "@shared/utils/functions"
import DeleteSVG from "@shared/ui/SVGs/Delete"
import SettingsSVG from "@shared/ui/SVGs/Settings"
import Loader from "@shared/ui/Loader"
import DownloadSVG from "@shared/ui/SVGs/Download"
import ExclamationSVG from "@shared/ui/SVGs/Exclamation"
import styles from "./ui/styles.module.css"

const handleSettingsClick = fileName => () => {
  dispatch({ type: SET_CURRENT_FILE_TO_CONFIG, payload: { fileName } })
}

const handleDeleteClick = fileName => () => {
  dispatch({ type: DELETE_FILE, payload: { fileName } })
}

const File = ({ inputFile, outputFormatSelect, className, ...attributes }) => {
  const fileConvertion = useStoreData(
    status => status.filesConvertion[inputFile.name]
  )

  return (
    <section
      className={`${styles["file-item"]}${className ? " " + className : ""}`}
      {...attributes}
    >
      <section className={styles["file-item__info"]}>
        <p>{inputFile.name}</p>
        <p className="text-secondary">{formatBytes(inputFile.size)}</p>
      </section>
      {fileConvertion?.status === "idle" ? (
        <section className={styles["file-item__actions"]}>
          {isValidElement(outputFormatSelect) && (
            <div className="flex sm-flex-column gap-50">
              <label htmlFor="output-format">Output: </label>
              {outputFormatSelect}
            </div>
          )}
          <button onClick={handleSettingsClick(inputFile.name)} type="button">
            <SettingsSVG />
          </button>
          <button onClick={handleDeleteClick(inputFile.name)} type="button">
            <DeleteSVG />
          </button>
        </section>
      ) : fileConvertion?.status === "processing" ? (
        <Loader className={styles["loader"]} />
      ) : fileConvertion?.status === "success" ? (
        <button>
          <DownloadSVG />
        </button>
      ) : (
        <ExclamationSVG />
      )}
    </section>
  )
}

export default File
