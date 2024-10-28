import { DARK, LIGHT, THEME } from "../../utils/constants"
import { setLocalStorageItem } from "../../utils/functions"

export const toggleTheme = (state) => {
  const theme = state.theme === DARK ? LIGHT : DARK

  setLocalStorageItem(THEME, theme)

  return { ...state, theme }
}