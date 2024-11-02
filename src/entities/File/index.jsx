import { formatBytes } from "@shared/utils/functions"
import DeleteSVG from "@shared/ui/SVGs/Delete"
import SettingsSVG from "@shared/ui/SVGs/Settings"
import styles from "./ui/styles.module.css"

const handleSettingsClick = event => {} // TODO

const handleDeleteClick = event => {} // TODO

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
        <div>
          <label htmlFor="output-format">Output: </label>
          <select name="output-format" id="output-format">
            <option selected disabled>
              -
            </option>
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
        <button onClick={handleDeleteClick} type="button">
          <DeleteSVG />
        </button>
      </section>
    </section>
  )
}

export default File
