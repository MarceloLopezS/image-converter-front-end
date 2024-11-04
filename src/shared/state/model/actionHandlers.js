import { DARK, LIGHT, THEME } from "../../utils/constants"
import { setLocalStorageItem } from "../../utils/functions"

export const toggleTheme = state => {
  const theme = state.theme === DARK ? LIGHT : DARK

  setLocalStorageItem(THEME, theme)

  return { ...state, theme }
}

export const addFiles = (state, action) => {
  const { payload } = action
  const files = [...state.files, ...payload]

  return { ...state, files }
}

export const deleteFile = (state, action) => {
  const { fileName } = action.payload
  const files = state.files.filter(file => file.name !== fileName)

  return { ...state, files }
}