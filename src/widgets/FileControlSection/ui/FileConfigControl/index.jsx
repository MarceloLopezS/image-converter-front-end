import { useQuery } from "@tanstack/react-query"
import { useStoreData } from "@shared/state/store"
import { API_ENDPOINT } from "@shared/utils/constants"
import { getFilesSettingsWarning } from "@shared/utils/functions"
import Loader from "@shared/ui/Loader"
import ParamsForm from "./ui/ParamsForm"
import styles from "./ui/styles.module.css"

const DEFAULT_ERROR_MESSAGE =
  "There was an error during the request. Please try again later."

const FileConfigControl = () => {
  const files = useStoreData(state => state.files)
  const filesConfig = useStoreData(state => state.filesConfig)
  const currentFileToConfig = useStoreData(state => state.currentFileToConfig)
  const filesConvertion = useStoreData(state => state.filesConvertion)

  const areFilesIdle = !!files.every(
    file => filesConvertion?.[file.name]?.status === "idle"
  )

  const outputFormats = new Set(
    Object.values(filesConfig).map(fileConfig => fileConfig.outputFormat)
  )
  const commonOutputFormat =
    outputFormats.size === 1 ? Array.from(outputFormats)[0] : null
  const filesLength = files.length
  const warningMessage = getFilesSettingsWarning(
    filesLength,
    filesConfig,
    currentFileToConfig
  )

  const { data, error, isLoading } = useQuery({
    queryKey: [
      API_ENDPOINT.OUTPUT_FORMAT_PARAMS,
      commonOutputFormat != null
        ? commonOutputFormat
        : filesConfig[currentFileToConfig]?.outputFormat
    ],
    enabled: !warningMessage
  })

  if (!areFilesIdle) {
    return (
      <section className={styles["file-config-container"]}>
        <section
          className={styles["file-config__header"]}
          data-current-file-to-config={
            currentFileToConfig ? currentFileToConfig : null
          }
        >
          <p>Settings:</p>
        </section>
        <section className={styles["file-config__body"]}>
          <p className="text-secondary">
            Settings were applied for convertion.
          </p>
        </section>
      </section>
    )
  }

  return (
    <section className={styles["file-config-container"]}>
      <section
        className={styles["file-config__header"]}
        data-current-file-to-config={
          currentFileToConfig ? currentFileToConfig : null
        }
      >
        <p>
          {filesLength > 0
            ? (currentFileToConfig && `Settings for ${currentFileToConfig}:`) ||
              `Preview settings for all (${filesLength}) files:`
            : "Settings:"}
        </p>
      </section>
      <section className={styles["file-config__body"]}>
        {warningMessage ? (
          <p className="text-secondary">{warningMessage}</p>
        ) : isLoading ? (
          <div className="grid place-items-center">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-secondary">{DEFAULT_ERROR_MESSAGE}</p>
        ) : (
          <ParamsForm
            key={currentFileToConfig}
            fileName={currentFileToConfig}
            serverOutputParams={data?.data?.output_params}
          />
        )}
      </section>
    </section>
  )
}

export default FileConfigControl
