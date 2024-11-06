import { useRef } from "react"
import { dispatch, useStoreData } from "@shared/state/store"
import { SET_FILES_OUTPUT_FORMAT } from "@shared/state/config/actions"

const FileOutputSelect = ({ fileName, outputOptions }) => {
  const outputSelectRef = useRef(null)
  const fileFormat = useStoreData(
    state => state.filesConfig[fileName].outputFormat
  )

  const handleOutputSelect = () => {
    const fileConfig = {
      fileName: fileName,
      outputFormat: outputSelectRef.current?.value
    }

    dispatch({
      type: SET_FILES_OUTPUT_FORMAT,
      payload: { filesOutputConfig: [fileConfig] }
    })
  }

  return (
    <select
      ref={outputSelectRef}
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
  )
}

export default FileOutputSelect
