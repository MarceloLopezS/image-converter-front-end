import { dispatch, useStoreData } from "@shared/state/store"
import { ADD_FILES } from "@shared/state/config/actions"
import { useInputValidationHandler } from "@shared/ui/Form"
import {
  isFileInputValid,
  handleInvalidFileInputMessage
} from "@shared/utils/functions"
import FileInput from "@shared/ui/FileInput"
import FileDropZone from "@shared/ui/FileDropZone"
import FileSVG from "@shared/ui/SVGs/File"
import File from "@entities/File"
import AllFilesOutputSelect from "./ui/AllFilesOutputSelect"
import styles from "./ui/styles.module.css"

const ACCEPTED_FILES = ["image/png", "image/jpeg", "image/webp"]
const OUTPUT_OPTIONS = ["png", "jpeg", "webp"]

const ImageInputContainer = () => {
  const files = useStoreData(state => state.files)
  const fileInputHandler = useInputValidationHandler(
    isFileInputValid(ACCEPTED_FILES),
    handleInvalidFileInputMessage(ACCEPTED_FILES)
  )

  const handleInputChange = () => {
    const isFileInputValid = fileInputHandler.validate()

    if (!isFileInputValid) return

    dispatch({
      type: ADD_FILES,
      payload: { selectedFiles: fileInputHandler.inputRef.current.files }
    })
    return
  }

  const handleFileDrop = files => {
    dispatch({
      type: ADD_FILES,
      payload: { selectedFiles: files }
    })
    return
  }

  return (
    <section className={styles["file-control"]}>
      {files.length > 0 ? (
        <section className={styles["file-control__files-container"]}>
          <section className={styles["file-control__add-files"]}>
            <FileInput
              ref={fileInputHandler.inputRef}
              className={styles["add-more-files-input"]}
              fileTypeIndicator={<FileSVG />}
              inputDescription="Add more files"
              acceptedFileTypes={ACCEPTED_FILES}
              onChange={handleInputChange}
              multiple
            />
          </section>
          <section className={styles["file-control__files-preview"]}>
            {files.map(file => (
              <File
                inputFile={file}
                outputOptions={OUTPUT_OPTIONS}
                className={styles["file-control__file-item"]}
                key={file.name}
              />
            ))}
          </section>
          <section className={styles["file-control__output-actions"]}>
            <div className="flex gap-50">
              <label htmlFor="all-files-output">
                All {`(${files.length})`} output:
              </label>
              <AllFilesOutputSelect
                outputOptions={OUTPUT_OPTIONS}
                fileNames={files.map(file => file.name)}
              />
            </div>
            <button className={styles["file-control__submit"]} type="button">
              Convert
              <i className={styles["arrow"]}></i>
            </button>
          </section>
        </section>
      ) : (
        <FileDropZone
          classNames={{
            container: styles["file-control__file-input-container"],
            containerOnDragOver: styles["dropzone-active"],
            inputButton: styles["file-input"]
          }}
          acceptedMIMETypes={ACCEPTED_FILES}
          fileTypeIndicator={<FileSVG />}
          filesValidateFn={isFileInputValid(ACCEPTED_FILES)}
          errorMessageHandler={handleInvalidFileInputMessage(ACCEPTED_FILES)}
          onFileChange={handleFileDrop}
        />
      )}
    </section>
  )
}

export default ImageInputContainer
