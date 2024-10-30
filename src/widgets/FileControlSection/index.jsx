import ImageInputContainer from "./ui/ImageInputContainer"
import styles from "./ui/styles.module.css"

const FileControlSection = () => {
  return (
    <section className={styles["file-control"]}>
      <ImageInputContainer />
    </section>
  )
}

export default FileControlSection
