import { dispatch, useStoreData } from "@shared/state/store"
import {
  SET_FILE_CONVERTION_ERROR,
  SET_FILE_CONVERTION_IS_PROCESSING,
  SET_FILE_CONVERTION_SUCCESS
} from "@shared/state/config/actions"
import uploadFileToConvert from "@features/uploadFileToConvert"

const ConvertButton = ({ files, className, children }) => {
  const filesConfig = useStoreData(state => state.filesConfig)
  const hasInvalidOutputFormat = !!Object.values(filesConfig).find(
    fileConfig => fileConfig.outputFormat == null
  )

  const onConvertClick = async () => {
    if (files.length === 0) return

    if (!filesConfig) return

    for (const fileConfig of Object.values(filesConfig)) {
      if (fileConfig.outputFormat == null) return

      if (fileConfig.outputParams == null) return
    }

    for (const file of files) {
      try {
        dispatch({
          type: SET_FILE_CONVERTION_IS_PROCESSING,
          payload: { fileName: file.name }
        })

        const data = await uploadFileToConvert({
          file,
          fileConfig: filesConfig[file.name]
        })

        if (data.status === "success") {
          dispatch({
            type: SET_FILE_CONVERTION_SUCCESS,
            payload: {
              fileName: file.name,
              convertionId: data.data.convertion_id
            }
          })
        } else if (data.status === "fail") {
          throw new Error(data.data.message)
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: SET_FILE_CONVERTION_ERROR,
          payload: { fileName: file.name, error: err }
        })
      }
    }
  }

  return (
    <button
      onClick={onConvertClick}
      className={className}
      type="button"
      disabled={hasInvalidOutputFormat ? true : null}
    >
      {children}
    </button>
  )
}

export default ConvertButton
