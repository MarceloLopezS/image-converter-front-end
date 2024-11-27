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

  const currentFileToConfig = state.currentFileToConfig === fileName
    ? null
    : state.currentFileToConfig

  return { ...state, files, filesConfig, currentFileToConfig }
}

export const setFilesOutputFormat = (state, action) => {
  const { filesOutputConfig } = action.payload

  const updatedConfigs = filesOutputConfig.map(fileOutputConfig => {
    return {
      [fileOutputConfig.fileName]: {
        ...state.filesConfig[fileOutputConfig.fileName],
        outputFormat: fileOutputConfig.outputFormat
      }
    }
  })

  const filesConfig = updatedConfigs.reduce((acc, fileConfig) => {
    return { ...acc, ...fileConfig }
  }, state.filesConfig)

  return { ...state, filesConfig }
}

export const setCurrentFileToConfig = (state, action) => {
  const { fileName } = action.payload
  const currentFileToConfig = fileName === state.currentFileToConfig
    ? null
    : fileName

  return { ...state, currentFileToConfig }
}

export const setFileOutputParams = (state, action) => {
  const { fileName, outputParams } = action.payload

  const fileConfig = {
    ...state.filesConfig[fileName],
    outputParams
  }

  const filesConfig = { ...state.filesConfig, [fileName]: fileConfig }

  return { ...state, filesConfig }
}

export const setFilesSharedOutputParams = (state, action) => {
  const { outputParams } = action.payload

  const filesSharedConfigCache = {
    ...state.filesSharedConfigCache, outputParams
  }

  const filesConfig =
    Object.entries(state.filesConfig)
      .reduce((acc, [fileName, config]) => {
        const updatedConfig = {
          ...config, outputParams
        }

        return { ...acc, [fileName]: updatedConfig }
      }, {})

  return { ...state, filesConfig, filesSharedConfigCache }
}