export const API_URL = import.meta.env.VITE_API_URL
export const API_ENDPOINT = {
  ALLOWED_IO: "/allowed-io",
  OUTPUT_FORMAT_PARAMS: "/output-format-params"
}
export const INITIAL_FILE_PARAMS = {
  outputFormat: null,
  outputParams: null
}
export const THEME = "theme"
export const DARK = "dark"
export const LIGHT = "light"
export const PREFERS_COLOR_SCHEME_DARK = `(prefers-color-scheme: ${DARK})`