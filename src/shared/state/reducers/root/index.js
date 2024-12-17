import {
  TOGGLE_THEME,
  ADD_FILES,
  DELETE_FILE,
  SET_FILES_OUTPUT_FORMAT,
  SET_CURRENT_FILE_TO_CONFIG,
  SET_FILE_OUTPUT_PARAMS,
  SET_FILES_SHARED_OUTPUT_PARAMS,
  SET_FILE_CONVERTION_IS_PROCESSING,
  SET_FILE_CONVERTION_SUCCESS,
  SET_FILE_CONVERTION_ERROR,
  RESET_ALL_FILE_STATE
} from "../../config/actions"
import {
  toggleTheme,
  addFiles,
  deleteFile,
  setFilesOutputFormat,
  setCurrentFileToConfig,
  setFileOutputParams,
  setFilesSharedOutputParams,
  setFileConvertionIsProcessing,
  setFileConvertionSuccess,
  setFileConvertionError,
  resetAllFileState
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
      return setFileOutputParams(state, action)
    case SET_FILES_SHARED_OUTPUT_PARAMS:
      return setFilesSharedOutputParams(state, action)
    case SET_FILE_CONVERTION_IS_PROCESSING:
      return setFileConvertionIsProcessing(state, action)
    case SET_FILE_CONVERTION_SUCCESS:
      return setFileConvertionSuccess(state, action)
    case SET_FILE_CONVERTION_ERROR:
      return setFileConvertionError(state, action)
    case RESET_ALL_FILE_STATE:
      return resetAllFileState(state)
    default:
      console.error(`Unknown action: ${action.type}`)
      return state
  }
}

export default rootReducer
