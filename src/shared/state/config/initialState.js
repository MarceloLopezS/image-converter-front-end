import { getPreferedColorScheme } from "../../utils/functions"

const INITIAL_STATE = {
  theme: getPreferedColorScheme(),
  files: [],
  filesConfig: {},
  currentFileToConfig: null
}

export default INITIAL_STATE
