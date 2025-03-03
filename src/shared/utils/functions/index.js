import { DARK, LIGHT, PREFERS_COLOR_SCHEME_DARK, THEME } from "../constants"

export const setLocalStorageItem = (key, item) => {
  return localStorage.setItem(key, JSON.stringify(item))
}

export const getLocalStorageItem = key => {
  return JSON.parse(localStorage.getItem(key))
}

export const getPreferedColorScheme = () => {
  const localPreference = getLocalStorageItem(THEME)

  if (localPreference) return localPreference

  return window.matchMedia(PREFERS_COLOR_SCHEME_DARK).matches ? DARK : LIGHT
}

export const capitalizeString = (string, separator = " ") => {
  if (typeof string !== "string") {
    throw new TypeError("String is expected to be capitalized.")
  }

  const strings = string.split(separator)
  return strings.map(string => string[0].toUpperCase() + string.substring(1))
    .join(separator)
}

export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;

  // Find the appropriate unit by calculating how many times we can divide by 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Convert to the appropriate unit and round to 2 decimal places
  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(2));

  return `${formattedValue} ${units[i]}`;
}

export const greaterThan = comparisonNumber =>
  value => value > comparisonNumber

export const getFileExtension = fileName => {
  return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2)
}

export const isFileInputValid = (
  allowedFileExtensions,
  maxFileSizeBytes
) => files => {
  const greaterThanMaxSize = greaterThan(maxFileSizeBytes)

  if (files?.length <= 0) return false

  for (let file of files) {
    if (greaterThanMaxSize(file.size)) return false

    if (!allowedFileExtensions.includes(
      getFileExtension(file.name)
    )) return false
  }

  return true
}

export const handleInvalidFileInputMessage = (
  allowedFileExtensions,
  maxFileSizeBytes
) => files => {
  const greaterThanMaxSize = greaterThan(maxFileSizeBytes)

  for (let file of files) {
    if (greaterThanMaxSize(file.size)) {
      return "One or more files exceed the max permitted size."
    }

    if (!allowedFileExtensions.includes(
      getFileExtension(file.name)
    )) {
      return "One or more files don't have a permitted type or extension."
    }
  }
}

export const getFilesSettingsWarning = (
  filesLength,
  filesConfig,
  currentFileToConfig
) => {
  const outputFormats = new Set(
    Object.values(filesConfig).map(fileConfig => fileConfig.outputFormat)
  )
  const isSameOutputFormat =
    outputFormats.size === 1 && Array.from(outputFormats)[0] !== null
  const currentFileOutputFormat = filesConfig[currentFileToConfig]?.outputFormat

  if (filesLength === 0) return "Choose some files first."

  if (!isSameOutputFormat && !currentFileToConfig) {
    return "Select a common output format for all files or access "
      + "each file settings."
  }

  if (currentFileToConfig && !currentFileOutputFormat) {
    return "Select an output format for the current file."
  }

  return null
}