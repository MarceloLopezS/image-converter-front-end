import { useRef, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINT } from "@shared/utils/constants"
import { dispatch, useStoreData } from "@shared/state/store"
import {
  SET_FILES_OUTPUT_FORMAT,
  SET_FILES_SHARED_OUTPUT_PARAMS
} from "@shared/state/config/actions"
import getOutputFormatParams from "@features/getOutputFormatParams"

const AllFilesOutputFormatSelect = ({ outputOptions, fileNames }) => {
  const selectOutputRef = useRef(null)
  const filesConfig = useStoreData(state => state.filesConfig)
  const outputFormats = new Set(
    Object.values(filesConfig).map(fileConfig => fileConfig.outputFormat)
  )
  const commonOutputFormat =
    outputFormats.size === 1 ? Array.from(outputFormats)[0] : null

  const handleOutputSelect = () => {
    const filesOutputConfig = fileNames.map(fileName => ({
      fileName,
      outputFormat: selectOutputRef.current.value
    }))
    dispatch({ type: SET_FILES_OUTPUT_FORMAT, payload: { filesOutputConfig } })
  }

  const { data, error } = useQuery({
    queryKey: [API_ENDPOINT.OUTPUT_FORMAT_PARAMS, commonOutputFormat],
    queryFn: () => getOutputFormatParams(commonOutputFormat),
    enabled: !!commonOutputFormat,
    staleTime: Infinity
  })

  useEffect(() => {
    if (!data || error) return

    const serverOutputParams = data.data.output_params
    const defaultOutputParams = serverOutputParams.reduce((acc, param) => {
      return { ...acc, [param.name]: param.default }
    }, {})

    dispatch({
      type: SET_FILES_SHARED_OUTPUT_PARAMS,
      payload: { outputParams: defaultOutputParams }
    })
  }, [data])

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

export default AllFilesOutputFormatSelect
