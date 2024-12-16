import styles from "./ui/styles.module.css"

const Arrow = ({ className, ...attributes }) => {
  return (
    <i
      className={`${styles.arrow}${className ? " " + className : ""}`}
      {...attributes}
    ></i>
  )
}

export default Arrow
