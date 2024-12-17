import { dispatch } from "@shared/state/store"
import { RESET_ALL_FILE_STATE } from "@shared/state/config/actions"
import Arrow from "@shared/ui/Arrow"

const onResetClick = () => {
  dispatch({
    type: RESET_ALL_FILE_STATE
  })
}

const HardResetButton = ({ className, children }) => {
  return (
    <button
      onClick={onResetClick}
      className={`${className} flex align-items-center gap-75`}
      type="button"
    >
      <Arrow variant="backward" />
      {children}
    </button>
  )
}

export default HardResetButton
