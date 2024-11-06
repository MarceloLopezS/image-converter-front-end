import { dispatch, useStoreData } from "@shared/state/store"
import {
  ADD_FILES,
  SET_FILES_OUTPUT_FORMAT
} from "@shared/state/config/actions"
import { useInputValidationHandler } from "@shared/ui/Form"
import {
  isFileInputValid,
  handleInvalidFileInputMessage
} from "@shared/utils/functions"
import FileInput from "@shared/ui/FileInput"
import FileSVG from "@shared/ui/SVGs/File"
import styles from "./ui/styles.module.css"
import File from "@entities/File"
import { useRef } from "react"

const ACCEPTED_FILES = ["image/png", "image/jpeg", "image/webp"]
const OUTPUT_OPTIONS = ["png", "jpeg", "webp"]

const ImageInputContainer = () => {
  const files = useStoreData(state => state.files)
  const filesConfig = useStoreData(state => state.filesConfig)
  const fileInputHandler = useInputValidationHandler(
    isFileInputValid(ACCEPTED_FILES),
    handleInvalidFileInputMessage(ACCEPTED_FILES)
  )
  const selectOutputRef = useRef(null)

  const outputFormats = new Set(
    Object.values(filesConfig).map(fileConfig => fileConfig.outputFormat)
  )

  const handleFileChange = () => {
    const isFileInputValid = fileInputHandler.validate()

    if (!isFileInputValid) return

    dispatch({
      type: ADD_FILES,
      payload: { selectedFiles: fileInputHandler.inputRef.current.files }
    })
    return
  }

  const handleOutputSelect = () => {
    const filesOutputConfig = files.map(file => ({
      fileName: file.name,
      outputFormat: selectOutputRef.current.value
    }))
    dispatch({ type: SET_FILES_OUTPUT_FORMAT, payload: { filesOutputConfig } })
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
              onChange={handleFileChange}
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
              <select
                ref={selectOutputRef}
                onChange={handleOutputSelect}
                id="all-files-output"
                value={
                  outputFormats.size === 1
                    ? Array.from(outputFormats)[0] || "-"
                    : "-"
                }
              >
                <option disabled>-</option>
                {OUTPUT_OPTIONS.map(option => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button className={styles["file-control__submit"]} type="button">
              Convert
              <i className={styles["arrow"]}></i>
            </button>
          </section>
        </section>
      ) : (
        <section className={styles["file-control__file-input-container"]}>
          {!fileInputHandler.isValid && (
            <div>{fileInputHandler.errorMessage}</div>
          )}
          <FileInput
            ref={fileInputHandler.inputRef}
            className={styles["file-input"]}
            fileTypeIndicator={<FileSVG />}
            inputDescription="Choose files"
            acceptedFileTypes={ACCEPTED_FILES}
            onChange={handleFileChange}
            multiple
          />
          <p className="text-secondary">Or drop them here. Max size: 10MB.</p>
        </section>
      )}
    </section>
  )
}

export default ImageInputContainer
