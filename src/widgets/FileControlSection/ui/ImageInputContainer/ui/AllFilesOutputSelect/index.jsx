import { useRef } from "react"
import { dispatch, useStoreData } from "@shared/state/store"
import { SET_FILES_OUTPUT_FORMAT } from "@shared/state/config/actions"

const AllFilesOutputSelect = ({ outputOptions, fileNames }) => {
  const selectOutputRef = useRef(null)
  const filesConfig = useStoreData(state => state.filesConfig)
  const outputFormats = new Set(
    Object.values(filesConfig).map(fileConfig => fileConfig.outputFormat)
  )

  const handleOutputSelect = () => {
    const filesOutputConfig = fileNames.map(fileName => ({
      fileName,
      outputFormat: selectOutputRef.current.value
    }))
    dispatch({ type: SET_FILES_OUTPUT_FORMAT, payload: { filesOutputConfig } })
  }

  return (
    <select
      ref={selectOutputRef}
      onChange={handleOutputSelect}
      id="all-files-output"
      value={
        outputFormats.size === 1 ? Array.from(outputFormats)[0] || "-" : "-"
      }
    >
      <option disabled>-</option>
      {outputOptions.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default AllFilesOutputSelect
