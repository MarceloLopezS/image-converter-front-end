import { useStoreData } from "@shared/state/store"
import ConvertButton from "./ui/ConvertButton"
import DownloadAllButton from "./ui/DownloadAllButton"
import Arrow from "@shared/ui/Arrow"
import Loader from "@shared/ui/Loader"

const SubmitButton = ({ files = [], className }) => {
  const filesConvertion = useStoreData(state => state.filesConvertion)
  const isLoading = files.find(
    file => filesConvertion?.[file.name]?.status === "processing"
  )
  const convertionIds = files
    .map(file => filesConvertion?.[file.name]?.convertionId)
    .filter(convertionId => convertionId != null)

  if (isLoading) {
    return (
      <button className={className} disabled={true} type="button">
        <Loader data-loader={true} />
      </button>
    )
  }

  if (convertionIds.length === files.length) {
    return (
      <DownloadAllButton convertionIds={convertionIds} className={className} />
    )
  }

  return (
    <ConvertButton files={files} className={className}>
      Convert
      <Arrow />
    </ConvertButton>
  )
}

export default SubmitButton
