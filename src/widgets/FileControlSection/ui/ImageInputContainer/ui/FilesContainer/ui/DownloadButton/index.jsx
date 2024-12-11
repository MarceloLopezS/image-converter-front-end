import { useRef } from "react"
import { SET_FILE_CONVERTION_ERROR } from "@shared/state/config/actions"
import { dispatch, useStoreData } from "@shared/state/store"
import DownloadSVG from "@shared/ui/SVGs/Download"
import downloadConvertedFile from "@features/downloadConvertedFile"

const DownloadButton = ({ fileName }) => {
  const convertionId = useStoreData(
    state => state.filesConvertion?.[fileName]?.convertionId
  )
  const linkRef = useRef(null)

  const onDownloadClick = async () => {
    if (linkRef.current.getAttribute("href")) {
      linkRef.current.click()
      return
    }

    try {
      const response = await downloadConvertedFile(convertionId)

      if (response.status === 200) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        linkRef.current.setAttribute("href", url)
        linkRef.current.setAttribute("download", `${fileName.split(".")[0]}`)
        linkRef.current.click()
      } else {
        const data = await response.json()
        throw new Error(data.data.message)
      }
    } catch (err) {
      console.error(err)
      dispatch({
        type: SET_FILE_CONVERTION_ERROR,
        payload: { fileName, error: err }
      })
    }
  }

  return (
    <button onClick={onDownloadClick} type="button">
      <a ref={linkRef}>
        <DownloadSVG />
      </a>
    </button>
  )
}

export default DownloadButton
