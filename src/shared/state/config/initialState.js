import { getPreferedColorScheme } from "../../utils/functions"

const INITIAL_STATE = {
  theme: getPreferedColorScheme(),
  files: [],
  filesConfig: {
    // [fileName]: {
    //   outputFormat: null | string,
    //   outputParams: {}
    // }
  },
  currentFileToConfig: null
}

export default INITIAL_STATE
