import { useStoreData } from "@shared/state/store"

const FileConfigControl = () => {
  const files = useStoreData(state => state.files)
  const currentFileToConfig = useStoreData(state => state.currentFileToConfig)

  const filesLength = files.length

  return (
    <section>
      <section>
        <p>
          {filesLength > 0
            ? (currentFileToConfig && `Settings for ${currentFileToConfig}:`) ||
              `Settings for all (${filesLength}) files:`
            : "Settings:"}
        </p>
      </section>
      <section>
        {filesLength === 0 ? (
          <p>Choose some files first.</p>
        ) : (
          <section></section>
        )}
      </section>
    </section>
  )
}

export default FileConfigControl
