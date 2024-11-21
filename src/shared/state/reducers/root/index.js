import {
  TOGGLE_THEME,
  ADD_FILES,
  DELETE_FILE,
  SET_FILES_OUTPUT_FORMAT,
  SET_CURRENT_FILE_TO_CONFIG,
  SET_FILE_OUTPUT_PARAMS,
  UPDATE_FILE_OUTPUT_PARAMS
} from "../../config/actions"
import {
  toggleTheme,
  addFiles,
  deleteFile,
  setFilesOutputFormat,
  setCurrentFileToConfig,
  setFileOuputParams,
  updateFileOuputParams
} from "../../model/actionHandlers"

const rootReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return toggleTheme(state)
    case ADD_FILES:
      return addFiles(state, action)
    case DELETE_FILE:
      return deleteFile(state, action)
    case SET_FILES_OUTPUT_FORMAT:
      return setFilesOutputFormat(state, action)
    case SET_CURRENT_FILE_TO_CONFIG:
      return setCurrentFileToConfig(state, action)
    case SET_FILE_OUTPUT_PARAMS:
      return setFileOuputParams(state, action)
    case UPDATE_FILE_OUTPUT_PARAMS:
      return updateFileOuputParams(state, action)
    default:
      console.error(`Unknown action: ${action.type}`)
      return state
  }
}

export default rootReducer
