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
import HardResetButton from "./ui/HardResetButton"
import FileOutputFormatSelect from "./ui/FileOutputFormatSelect"
import AllFilesOutputFormatSelect from "./ui/AllFilesOutputFormatSelect"
import DownloadButton from "./ui/DownloadButton"
import SubmitButton from "./ui/SubmitButton"
import styles from "./ui/styles.module.css"

const handleAllFilesSettingsClick = () => {
  dispatch({ type: SET_CURRENT_FILE_TO_CONFIG, payload: { fileName: null } })
}

const FilesContainer = ({
  files,
  allowedExtensions,
  maxFileSizeBytes,
  outputOptions
}) => {
  const currentFileToConfig = useStoreData(state => state.currentFileToConfig)
  const filesConvertion = useStoreData(state => state.filesConvertion)

  const fileInputHandler = useInputValidationHandler(
    isFileInputValid(allowedExtensions, maxFileSizeBytes)
  )

  const areFilesIdle = !!files.every(
    file => filesConvertion?.[file.name]?.status === "idle"
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
        {areFilesIdle ? (
          <FileInput
            ref={fileInputHandler.inputRef}
            className={styles["add-more-files-input"]}
            fileTypeIndicator={<FileSVG />}
            inputDescription="Add more files"
            acceptedFileTypes={allowedExtensions.map(ext => `.${ext}`)}
            onChange={handleInputChange}
            multiple
          />
        ) : (
          <HardResetButton className={styles["convert-more"]} type="button">
            Convert more files
          </HardResetButton>
        )}
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
            downloadButton={<DownloadButton fileName={file.name} />}
            className={styles["file-control__file-item"]}
            data-current-file-to-config={
              currentFileToConfig === file.name ? true : null
            }
            key={file.name}
          />
        ))}
      </section>
      <section className={styles["file-control__output-actions"]}>
        {areFilesIdle ? (
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
        ) : (
          <div></div>
        )}
        <SubmitButton
          files={files}
          className={styles["file-control__submit"]}
        />
      </section>
    </section>
  )
}

export default FilesContainer
