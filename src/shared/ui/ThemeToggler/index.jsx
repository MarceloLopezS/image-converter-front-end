import { useStoreData, dispatch } from "../../state/store"
import { TOGGLE_THEME } from "../../state/config/actions"
import { DARK } from "../../utils/constants"
import SunSVG from "../SVGs/Sun"
import MoonSVG from "../SVGs/Moon"

const ThemeToggler = ({ ...attributes }) => {
  const theme = useStoreData(state => state.theme)
  const dispatchAction = () => dispatch({ type: TOGGLE_THEME })

  return (
    <button type="button" onClick={dispatchAction} {...attributes}>
      <span className="visually-hidden">Toggle Theme</span>
      {theme === DARK ? <SunSVG /> : <MoonSVG />}
    </button>
  )
}

export default ThemeToggler
