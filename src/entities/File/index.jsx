import DeleteSVG from "@shared/ui/SVGs/Delete"
import SettingsSVG from "@shared/ui/SVGs/Settings"
import { formatBytes } from "@shared/utils/functions"

const handleSettingsClick = event => {} // TODO

const handleDeleteClick = event => {} // TODO

const File = ({ inputFile, outputOptions }) => {
  return (
    <div>
      <section>
        <p>{inputFile.name}</p>
        <p>{formatBytes(inputFile.size)}</p>
      </section>
      <section>
        <div>
          <label htmlFor="output-format">Output:</label>
          <select name="output-format" id="output-format">
            {outputOptions.map(outputOption => (
              <option value={outputOption} key={outputOption}>
                {outputOption.toUpperCase()}
              </option>
            ))}
          </select>
          <button onClick={handleSettingsClick}>
            <SettingsSVG />
          </button>
          <button onClick={handleDeleteClick}>
            <DeleteSVG />
          </button>
        </div>
      </section>
    </div>
  )
}

export default File
