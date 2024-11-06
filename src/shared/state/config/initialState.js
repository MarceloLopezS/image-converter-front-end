import { getPreferedColorScheme } from "../../utils/functions"

const INITIAL_STATE = {
  theme: getPreferedColorScheme(),
  files: [],
  filesConfig: {}
}

export default INITIAL_STATE
