import { forwardRef, useRef, useState } from "react"

export const useInputValidationHandler = (
  validationFn = valueOrFiles => !!valueOrFiles,
  errorMessageHandler = valueOrFiles => ""
) => {
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const inputRef = useRef(null)

  const validate = () => {
    let sync_IsValid = true
    const validationArg =
      inputRef.current.type === "file"
        ? inputRef.current.files
        : inputRef.current.value

    if (validationFn(validationArg)) {
      sync_IsValid = true
      !isValid && setIsValid(true)
      errorMessage && setErrorMessage(null)
    } else {
      sync_IsValid = false
      isValid && setIsValid(false)
      typeof errorMessageHandler === "function" &&
        setErrorMessage(errorMessageHandler(validationArg))
    }

    return sync_IsValid
  }

  const handleServerValidation = error => {
    if (!error) return

    isValid && setIsValid(false)
    setErrorMessage(error)
  }

  return {
    inputRef,
    validate,
    isValid,
    errorMessage,
    handleServerValidation
  }
}

const Form = forwardRef(({ children, ...attributes }, ref) => {
  return (
    <form ref={ref} {...attributes}>
      {children}
    </form>
  )
})

export default Form
