import { TOGGLE_THEME } from "../../config/actions"
import { toggleTheme } from "../../model/actionHandlers"

const rootReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return toggleTheme(state)
    default:
      console.error(`Unknown action: ${action.type}`)
      return state
  }
}

export default rootReducer