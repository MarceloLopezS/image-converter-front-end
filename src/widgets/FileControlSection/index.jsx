import ImageInputContainer from "./ui/ImageInputContainer"
import FileConfigControl from "./ui/FileConfigControl"
import styles from "./ui/styles.module.css"

const FileControlSection = () => {
  return (
    <section className={styles["file-control"]}>
      <ImageInputContainer />
      <FileConfigControl />
    </section>
  )
}

export default FileControlSection
