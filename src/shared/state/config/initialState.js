import { getPreferedColorScheme } from "../../utils/functions"

const INITIAL_STATE = {
  theme: getPreferedColorScheme(), // string
  files: [], // File[]
  currentFileToConfig: null, // null | string
  filesConfig: {
    // [fileName]: {
    //   outputFormat: null | string,
    //   outputParams: null | { [param1]: any, [param2]: any, ... }
    // }
  },
  filesSharedConfigCache: {
    // outputParams: null | { [param1]: any, [param2]: any, ... }
  }
}

export default INITIAL_STATE
