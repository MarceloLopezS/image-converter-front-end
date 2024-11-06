import { SET_FILES_OUTPUT_FORMAT } from "@shared/state/config/actions"
import { dispatch, useStoreData } from "@shared/state/store"
import { useRef } from "react"

const FileOutputSelect = ({ fileName, outputOptions }) => {
  const selectRef = useRef(null)
  const fileFormat = useStoreData(
    state => state.filesConfig[fileName].outputFormat
  )

  const handleOutputSelect = () => {
    const fileConfig = {
      fileName: fileName,
      outputFormat: selectRef.current?.value
    }

    dispatch({
      type: SET_FILES_OUTPUT_FORMAT,
      payload: { filesOutputConfig: [fileConfig] }
    })
  }

  return (
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
  )
}

export default FileOutputSelect
