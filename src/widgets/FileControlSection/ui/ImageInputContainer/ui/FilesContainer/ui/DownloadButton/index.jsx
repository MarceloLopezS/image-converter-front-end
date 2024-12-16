import { useStoreData } from "@shared/state/store"
import useDownload from "@shared/model/hooks/useDownload"
import Loader from "@shared/ui/Loader"
import DownloadSVG from "@shared/ui/SVGs/Download"
import downloadConvertedFile from "@features/downloadConvertedFile"
import ExclamationSVG from "@shared/ui/SVGs/Exclamation"

const downloadRequest = convertionId => () =>
  downloadConvertedFile(convertionId)

const responseHandler = async (response, setHref) => {
  if (response.status === 200) {
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    setHref(url)
  } else {
    const data = await response.json()
    throw new Error(data.data.message)
  }
}

const DownloadButton = ({ fileName }) => {
  const convertionId = useStoreData(
    state => state.filesConvertion?.[fileName]?.convertionId
  )
  const { linkRef, download, href, isLoading, error } = useDownload(
    downloadRequest(convertionId),
    responseHandler
  )

  const onDownloadClick = async () => {
    if (href) {
      linkRef.current.click()
      return
    }

    await download()
  }

  if (isLoading) return <Loader data-loader={true} />

  return (
    <button onClick={onDownloadClick} type="button">
      {error ? (
        <ExclamationSVG />
      ) : (
        <>
          <a
            style={{ display: "none" }}
            ref={linkRef}
            href={href}
            download={href ? `${fileName.split(".")[0]}` : null}
          ></a>
          <DownloadSVG />
        </>
      )}
    </button>
  )
}

export default DownloadButton
