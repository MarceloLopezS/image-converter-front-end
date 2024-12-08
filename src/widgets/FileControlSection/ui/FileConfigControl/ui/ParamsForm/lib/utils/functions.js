export const getFormattedInputValue = (input, { selectOptionSeparator }) => {
  const value =
    input.type === "checkbox"
      ? input.checked
      : input.type === "range" || input.type === "number"
        ? Number(input.value)
        : input.type === "select-one"
          ? selectOptionSeparator != null
            ? input.value.split(selectOptionSeparator).map(item => {
              try {
                return Number(item)
              } catch {
                return item
              }
            })
            : input.value
          : input.value

  return value
}