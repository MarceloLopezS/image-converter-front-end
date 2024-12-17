import useDownload from "@shared/model/hooks/useDownload"
import Loader from "@shared/ui/Loader"
import downloadAllConvertedFiles from "@features/downloadAllConvertedFiles"
import ExclamationSVG from "@shared/ui/SVGs/Exclamation"
import Arrow from "@shared/ui/Arrow"

const downloadRequest = convertionIds => () =>
  downloadAllConvertedFiles(convertionIds)

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

const DownloadAllButton = ({ convertionIds, className }) => {
  const { linkRef, download, href, isLoading, error } = useDownload(
    downloadRequest(convertionIds),
    responseHandler
  )

  const onDownloadClick = async () => {
    if (href) {
      linkRef.current.click()
      return
    }

    await download()
  }

  if (isLoading) return

  return (
    <button onClick={onDownloadClick} className={className} type="button">
      {isLoading ? (
        <Loader data-loader={true} />
      ) : (
        <>
          <a
            style={{ display: "none" }}
            ref={linkRef}
            href={href}
            download={href ? "ImageIO-converted-files" : null}
            className="flex align-items-center gap-75"
          ></a>
          Download All
          {error ? <ExclamationSVG /> : <Arrow />}
        </>
      )}
    </button>
  )
}

export default DownloadAllButton
