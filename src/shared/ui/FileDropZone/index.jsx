import { useRef, useState } from "react"
import { formatBytes } from "@shared/utils/functions"
import FileInput from "@shared/ui/FileInput"

const FileDropZone = ({
  classNames = {
    container: "",
    containerOnDragOver: "",
    inputButton: "",
    errorContainer: ""
  },
  acceptedFileTypes = ["image"],
  maxFileSizeBytes = 10 * 1024 * 1024,
  fileTypeIndicator = <></>,
  filesValidateFn = files => true,
  errorMessageHandler = files => "",
  onFileChange = files => undefined
}) => {
  const fileInputRef = useRef(null)
  const [isDragingOver, setIsDragingOver] = useState(false)
  const [error, setError] = useState(null)

  const onDragEnter = event => {
    setIsDragingOver(true)
  }

  const onDragLeave = event => {
    setIsDragingOver(false)
  }

  const onDrop = event => {
    event.preventDefault()
    const files = event.dataTransfer.items
      ? [...event.dataTransfer.items]
          .filter(item => item.kind === "file")
          .map(item => item.getAsFile())
      : [...event.dataTransfer.files]

    if (!filesValidateFn(files)) return

    onFileChange(files)
  }

  const onChange = () => {
    const files = fileInputRef.current.files

    if (!filesValidateFn(files)) {
      setError(errorMessageHandler(files))
    }

    onFileChange(files)
  }

  return (
    <section
      className={`${
        isDragingOver && classNames.containerOnDragOver
      }${classNames.container ? " " + classNames.container : ""}`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
    >
      {error && <div className={classNames.errorContainer}>{error}</div>}
      {isDragingOver ? (
        fileTypeIndicator
      ) : (
        <>
          <FileInput
            ref={fileInputRef}
            className={classNames.inputButton}
            fileTypeIndicator={fileTypeIndicator}
            inputDescription="Choose files"
            acceptedFileTypes={acceptedFileTypes}
            onChange={onChange}
            multiple
          />
          <p className="text-secondary">
            Or drop them here. Max size: {formatBytes(maxFileSizeBytes)}
          </p>
        </>
      )}
    </section>
  )
}

export default FileDropZone
