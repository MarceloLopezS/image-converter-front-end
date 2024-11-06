import { dispatch, useStoreData } from "@shared/state/store"
import {
  DELETE_FILE,
  SET_FILES_OUTPUT_FORMAT
} from "@shared/state/config/actions"
import { formatBytes } from "@shared/utils/functions"
import DeleteSVG from "@shared/ui/SVGs/Delete"
import SettingsSVG from "@shared/ui/SVGs/Settings"
import styles from "./ui/styles.module.css"
import { useRef } from "react"

const handleSettingsClick = event => {} // TODO

const handleDeleteClick = fileName => () => {
  dispatch({ type: DELETE_FILE, payload: { fileName } })
}

const File = ({ inputFile, outputOptions, className }) => {
  const fileFormat = useStoreData(
    state => state.filesConfig[inputFile.name].outputFormat
  )
  const selectRef = useRef(null)

  const handleOutputSelect = () => {
    const fileConfig = {
      fileName: inputFile.name,
      outputFormat: selectRef.current?.value
    }

    dispatch({
      type: SET_FILES_OUTPUT_FORMAT,
      payload: { filesOutputConfig: [fileConfig] }
    })
  }

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
          <select
            ref={selectRef}
            onChange={handleOutputSelect}
            name="output-format"
            id="output-format"
            value={fileFormat || "-"}
          >
            <option disabled>-</option>
            {outputOptions.map(outputOption => (
              <option value={outputOption} key={outputOption}>
                {outputOption}
              </option>
            ))}
          </select>
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
