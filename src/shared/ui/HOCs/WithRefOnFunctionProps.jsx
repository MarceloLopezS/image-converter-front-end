import React, { useRef } from "react"

const WithRefOnFunctionProps = ({ component, ...props }) => {
  const ref = useRef(null)
  const modProps = Object.fromEntries(
    Object.entries(props).map(([key, value]) =>
      typeof value === "function" ? [key, () => value(ref)] : [key, value]
    )
  )

  if (!React.isValidElement(component)) {
    return component
  }

  return React.cloneElement(component, { ref, ...modProps })
}

export default WithRefOnFunctionProps
