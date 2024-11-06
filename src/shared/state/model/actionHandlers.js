import { DARK, INITIAL_FILE_PARAMS, LIGHT, THEME } from "../../utils/constants"
import { setLocalStorageItem } from "../../utils/functions"

export const toggleTheme = state => {
  const theme = state.theme === DARK ? LIGHT : DARK

  setLocalStorageItem(THEME, theme)

  return { ...state, theme }
}

export const addFiles = (state, action) => {
  const { selectedFiles } = action.payload
  const unrepeatedFiles = [...selectedFiles].filter(file => {
    return !state.files.find(stateFile => stateFile.name === file.name)
  })
  const files = [...unrepeatedFiles, ...state.files]

  const filesConfig =
    unrepeatedFiles.reduce((acc, file) => {
      const initialFileConfig = {
        [file.name]: INITIAL_FILE_PARAMS
      }

      return { ...acc, ...initialFileConfig }
    }, { ...state.filesConfig })

  return { ...state, files, filesConfig }
}

export const deleteFile = (state, action) => {
  const { fileName } = action.payload
  const files = state.files.filter(file => file.name !== fileName)

  const filesConfig = Object.keys(state.filesConfig)
    .filter(key => key !== fileName)
    .reduce((acc, key) => {
      return { ...acc, [key]: state.filesConfig[key] }
    }, {})

  return { ...state, files, filesConfig }
}