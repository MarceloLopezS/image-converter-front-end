import { useRef, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINT } from "@shared/utils/constants"
import { dispatch, useStoreData } from "@shared/state/store"
import {
  SET_FILE_OUTPUT_PARAMS,
  SET_FILES_OUTPUT_FORMAT
} from "@shared/state/config/actions"
import getOutputFormatParams from "@features/getOutputFormatParams"

const FileOutputFormatSelect = ({ fileName, outputOptions }) => {
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

  const { data, error } = useQuery({
    queryKey: [API_ENDPOINT.OUTPUT_FORMAT_PARAMS, fileFormat],
    queryFn: () => getOutputFormatParams(fileFormat),
    enabled: !!fileFormat,
    staleTime: Infinity
  })

  useEffect(() => {
    if (!data || error) return

    const serverOutputParams = data.data.output_params
    const defaultOutputParams = serverOutputParams.reduce((acc, param) => {
      return { ...acc, [param.name]: param.default }
    }, {})

    dispatch({
      type: SET_FILE_OUTPUT_PARAMS,
      payload: { fileName, outputParams: defaultOutputParams }
    })
  }, [data])

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

export default FileOutputFormatSelect
