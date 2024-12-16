export const API_URL = import.meta.env.VITE_API_URL
export const API_ENDPOINT = {
  ALLOWED_IO_PARAMS: "/allowed-io-params",
  OUTPUT_FORMAT_PARAMS: "/output-format-param-fields",
  CONVERT: "/convert",
  DOWNLOAD_CONVERTED_FILE: "/download-converted-file",
  DOWNLOAD_ALL_CONVERTED_FILES: "/download-all-converted-files",
}
export const INITIAL_FILE_PARAMS = {
  outputFormat: null,
  outputParams: null
}
export const INITIAL_FILE_CONVERTION = {
  status: "idle",
  convertionId: null,
  error: null
}
export const THEME = "theme"
export const DARK = "dark"
export const LIGHT = "light"
export const PREFERS_COLOR_SCHEME_DARK = `(prefers-color-scheme: ${DARK})`