import { dispatch, useStoreData } from "@shared/state/store"
import {
  ADD_FILES,
  SET_CURRENT_FILE_TO_CONFIG
} from "@shared/state/config/actions"
import { useInputValidationHandler } from "@shared/ui/Form"
import {
  isFileInputValid,
  handleInvalidFileInputMessage
} from "@shared/utils/functions"
import FileInput from "@shared/ui/FileInput"
import FileDropZone from "@shared/ui/FileDropZone"
import FileSVG from "@shared/ui/SVGs/File"
import SettingsSVG from "@shared/ui/SVGs/Settings"
import File from "@entities/File"
import FileOutputFormatSelect from "./ui/FileOutputFormatSelect"
import AllFilesOutputFormatSelect from "./ui/AllFilesOutputFormatSelect"
import styles from "./ui/styles.module.css"

const ALLOWED_EXTENSIONS = ["ico", "jpg", "jpeg", "png", "webp"]
const OUTPUT_OPTIONS = ["ico", "png", "jpeg", "webp"]

const handleAllFilesSettingsClick = () => {
  dispatch({ type: SET_CURRENT_FILE_TO_CONFIG, payload: { fileName: null } })
}

const ImageInputContainer = () => {
  const files = useStoreData(state => state.files)
  const currentFileToConfig = useStoreData(state => state.currentFileToConfig)
  const fileInputHandler = useInputValidationHandler(
    isFileInputValid(ALLOWED_EXTENSIONS),
    handleInvalidFileInputMessage(ALLOWED_EXTENSIONS)
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
              acceptedFileTypes={ALLOWED_EXTENSIONS}
              onChange={handleInputChange}
              multiple
            />
          </section>
          <section className={styles["file-control__files-preview"]}>
            {files.map(file => (
              <File
                inputFile={file}
                outputFormatSelect={
                  <FileOutputFormatSelect
                    fileName={file.name}
                    outputOptions={OUTPUT_OPTIONS}
                  />
                }
                className={styles["file-control__file-item"]}
                data-current-file-to-config={
                  currentFileToConfig === file.name ? true : null
                }
                key={file.name}
              />
            ))}
          </section>
          <section className={styles["file-control__output-actions"]}>
            <div className="flex gap-50 align-items-center">
              <label htmlFor="all-files-output">
                All {`(${files.length})`} output:
              </label>
              <AllFilesOutputFormatSelect
                outputOptions={OUTPUT_OPTIONS}
                fileNames={files.map(file => file.name)}
              />
              <button
                className={styles["settings-btn"]}
                onClick={handleAllFilesSettingsClick}
              >
                <SettingsSVG />
              </button>
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
          acceptedFileTypes={ALLOWED_EXTENSIONS.map(ext => `.${ext}`)}
          maxFileSizeBytes={10 * 1024 * 1024}
          fileTypeIndicator={<FileSVG />}
          filesValidateFn={isFileInputValid(ALLOWED_EXTENSIONS)}
          errorMessageHandler={handleInvalidFileInputMessage(
            ALLOWED_EXTENSIONS
          )}
          onFileChange={handleFileDrop}
        />
      )}
    </section>
  )
}

export default ImageInputContainer
