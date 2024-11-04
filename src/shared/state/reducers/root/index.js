import { TOGGLE_THEME, ADD_FILES, DELETE_FILE } from "../../config/actions"
import { toggleTheme, addFiles, deleteFile } from "../../model/actionHandlers"

const rootReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return toggleTheme(state)
    case ADD_FILES:
      return addFiles(state, action)
    case DELETE_FILE:
      return deleteFile(state, action)
    default:
      console.error(`Unknown action: ${action.type}`)
      return state
  }
}

export default rootReducer
