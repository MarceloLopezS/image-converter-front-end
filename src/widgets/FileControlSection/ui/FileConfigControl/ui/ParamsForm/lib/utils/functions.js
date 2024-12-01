export const getFormattedInputValue = (input, { selectOptionSeparator }) => {
  const value =
    input.type === "checkbox"
      ? input.checked
        ? 1
        : 0
      : input.type === "range" || input.type === "number"
        ? Number(input.value)
        : input.type === "select-one"
          ? selectOptionSeparator != null
            ? input.value.split(selectOptionSeparator)
            : input.value
          : input.value

  return value
}