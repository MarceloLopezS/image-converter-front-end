import { forwardRef, useState, useRef } from "react"
import styles from "./ui/styles.module.css"

const RangeInput = forwardRef(
  ({ value, min, max, onChange, className, ...attributes }, ref) => {
    const [currentValue, setcurrentValue] = useState(value)
    const rangeRef = useRef(null)
    const numberInputRef = useRef(null)

    const onRangeChange = () => {
      const reference = ref ? ref : rangeRef
      if (min > reference.current.value || reference.current.value > max) {
        return
      }

      setcurrentValue(reference.current.value)
      onChange(ref ? ref : rangeRef)
    }

    const onNumberChange = () => {
      if (
        min > numberInputRef.current.value ||
        numberInputRef.current.value > max
      ) {
        return
      }

      setcurrentValue(numberInputRef.current.value)
    }

    return (
      <div
        className={
          styles["custom-range"] + `${className ? " " + className : ""}`
        }
      >
        <input
          ref={ref ? ref : rangeRef}
          onChange={onRangeChange}
          type="range"
          value={currentValue}
          min={min}
          max={max}
          {...attributes}
        />
        <input
          ref={numberInputRef}
          onChange={onNumberChange}
          type="number"
          value={currentValue}
          min={min}
          max={max}
        />
      </div>
    )
  }
)

export default RangeInput
