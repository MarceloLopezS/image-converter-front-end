import styles from "./ui/styles.module.css"

const Arrow = ({ variant = "forward", className, ...attributes }) => {
  return (
    <i
      className={`${styles.arrow}${className ? " " + className : ""}`}
      data-variant={variant}
      {...attributes}
    ></i>
  )
}

export default Arrow
