import { dispatch, useStoreData } from "@shared/state/store"
import {
  ADD_FILES,
  SET_CURRENT_FILE_TO_CONFIG
} from "@shared/state/config/actions"
import { isFileInputValid } from "@shared/utils/functions"
import { useInputValidationHandler } from "@shared/ui/Form"
import FileInput from "@shared/ui/FileInput"
import FileSVG from "@shared/ui/SVGs/File"
import SettingsSVG from "@shared/ui/SVGs/Settings"
import File from "@entities/File"
import FileOutputFormatSelect from "./ui/FileOutputFormatSelect"
import AllFilesOutputFormatSelect from "./ui/AllFilesOutputFormatSelect"
import styles from "./ui/styles.module.css"

const handleAllFilesSettingsClick = () => {
  dispatch({ type: SET_CURRENT_FILE_TO_CONFIG, payload: { fileName: null } })
}

const FilesContainer = ({
  files,
  allowedExtensions,
  outputOptions,
  onConvertClick
}) => {
  const currentFileToConfig = useStoreData(state => state.currentFileToConfig)
  const fileInputHandler = useInputValidationHandler(
    isFileInputValid(allowedExtensions)
  )

  const handleInputChange = () => {
    const isFileInputValid = fileInputHandler.validate()

    if (!isFileInputValid) return

    dispatch({
      type: ADD_FILES,
      payload: { selectedFiles: fileInputHandler.inputRef.current.files }
    })
  }

  return (
    <section className={styles["file-control__files-container"]}>
      <section className={styles["file-control__add-files"]}>
        <FileInput
          ref={fileInputHandler.inputRef}
          className={styles["add-more-files-input"]}
          fileTypeIndicator={<FileSVG />}
          inputDescription="Add more files"
          acceptedFileTypes={allowedExtensions.map(ext => `.${ext}`)}
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
                outputOptions={outputOptions}
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
            outputOptions={outputOptions}
            fileNames={files.map(file => file.name)}
          />
          <button
            className={styles["settings-btn"]}
            onClick={handleAllFilesSettingsClick}
          >
            <SettingsSVG />
          </button>
        </div>
        <button
          onClick={onConvertClick}
          className={styles["file-control__submit"]}
          type="button"
        >
          Convert
          <i className={styles["arrow"]}></i>
        </button>
      </section>
    </section>
  )
}

export default FilesContainer
