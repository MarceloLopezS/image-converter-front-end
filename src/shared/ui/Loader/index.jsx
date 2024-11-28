import styles from "./ui/styles.module.css"

const Loader = ({ className, ...attributes }) => {
  return (
    <div
      className={`${styles.loader}${className ? " " + className : ""}`}
      {...attributes}
    ></div>
  )
}

export default Loader
