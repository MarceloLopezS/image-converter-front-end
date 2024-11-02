import { dispatch, useStoreData } from "@shared/state/store"
import { ADD_FILES } from "@shared/state/config/actions"
import Form, { useInputValidationHandler } from "@shared/ui/Form"
import {
  isFileInputValid,
  handleInvalidFileInputMessage
} from "@shared/utils/functions"
import FileInput from "@shared/ui/FileInput"
import FileSVG from "@shared/ui/SVGs/File"
import styles from "./ui/styles.module.css"
import File from "@entities/File"

const ACCEPTED_FILES = ["image/png", "image/jpeg", "image/webp"]
const OUTPUT_OPTIONS = ["png", "jpeg", "webp"]

const ImageInputContainer = () => {
  const files = useStoreData(state => state.files)
  const fileInputHandler = useInputValidationHandler(
    isFileInputValid(ACCEPTED_FILES),
    handleInvalidFileInputMessage(ACCEPTED_FILES)
  )

  const handleFileChange = () => {
    const isFileInputValid = fileInputHandler.validate()

    if (!isFileInputValid) return

    dispatch({
      type: ADD_FILES,
      payload: fileInputHandler.inputRef.current.files
    })
    return
  }

  return (
    <section className={styles["image-control"]}>
      {files.length > 0 ? (
        <section className={styles["image-control__files-container"]}>
          {files.map(file => (
            <File
              inputFile={file}
              outputOptions={OUTPUT_OPTIONS}
              className={styles["image-control__file-item"]}
              key={file.name}
            />
          ))}
          <section className={styles["image-control__files-output"]}>
            <div>
              <label htmlFor="all-files-output">Convert all to: </label>
              <select name="all-files-output" id="all-files-output">
                <option selected disabled>
                  -
                </option>
                {OUTPUT_OPTIONS.map(option => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button className={styles["image-control__submit"]} type="button">
              Convert
              <i className={styles["arrow"]}></i>
            </button>
          </section>
        </section>
      ) : (
        <section className={styles["image-control__file-input-container"]}>
          {!fileInputHandler.isValid && (
            <div>{fileInputHandler.errorMessage}</div>
          )}
          <Form>
            <FileInput
              ref={fileInputHandler.inputRef}
              className={styles["file-input"]}
              fileTypeIndicator={<FileSVG />}
              inputDescription="Choose files"
              acceptedFileTypes={ACCEPTED_FILES}
              onChange={handleFileChange}
              multiple
            />
          </Form>
          <p className="text-secondary">Or drop them here. Max size: 10MB.</p>
        </section>
      )}
    </section>
  )
}

export default ImageInputContainer
