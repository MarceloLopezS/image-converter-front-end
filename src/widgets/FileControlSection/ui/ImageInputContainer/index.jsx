import { useQuery } from "@tanstack/react-query"
import { dispatch, useStoreData } from "@shared/state/store"
import { ADD_FILES } from "@shared/state/config/actions"
import { API_ENDPOINT } from "@shared/utils/constants"
import {
  isFileInputValid,
  handleInvalidFileInputMessage
} from "@shared/utils/functions"
import FileDropZone from "@shared/ui/FileDropZone"
import FileSVG from "@shared/ui/SVGs/File"
import Loader from "@shared/ui/Loader"
import getAllowedIOParams from "@features/getAllowedIOParams"
import FilesContainer from "./ui/FilesContainer"
import styles from "./ui/styles.module.css"

const DEFAULT_ERROR_MESSAGE =
  "There was a problem reaching the server. Please try again later."

const ImageInputContainer = () => {
  const files = useStoreData(state => state.files)

  const { data, status } = useQuery({
    queryKey: [API_ENDPOINT.ALLOWED_EXTENSIONS],
    queryFn: () => getAllowedIOParams(),
    staleTime: Infinity
  })

  const allowedExtensions = data?.input?.file_extensions
  const outputOptions = data?.output?.file_formats

  const handleFileDrop = files => {
    dispatch({
      type: ADD_FILES,
      payload: { selectedFiles: files }
    })
    return
  }

  if (status === "pending")
    return (
      <section className={styles["file-control__message-container"]}>
        <Loader />
      </section>
    )

  if (status === "error")
    return (
      <section className={styles["file-control__message-container"]}>
        <p className="text-secondary">{DEFAULT_ERROR_MESSAGE}</p>
      </section>
    )

  return (
    <section className={styles["file-control"]}>
      {files.length > 0 ? (
        <FilesContainer
          files={files}
          allowedExtensions={allowedExtensions}
          outputOptions={outputOptions}
          onConvertClick={() => console.log("Convert clicked.")}
        />
      ) : (
        <FileDropZone
          classNames={{
            container: styles["file-control__file-input-container"],
            containerOnDragOver: styles["dropzone-active"],
            inputButton: styles["file-input"]
          }}
          acceptedFileTypes={allowedExtensions.map(ext => `.${ext}`)}
          maxFileSizeBytes={10 * 1024 * 1024}
          fileTypeIndicator={<FileSVG />}
          filesValidateFn={isFileInputValid(allowedExtensions)}
          errorMessageHandler={handleInvalidFileInputMessage(allowedExtensions)}
          onFileChange={handleFileDrop}
        />
      )}
    </section>
  )
}

export default ImageInputContainer
