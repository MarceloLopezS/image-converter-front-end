import requestDownloadAllConvertedFiles from "./api"

const downloadAllConvertedFiles = async (convertionIds) => {
  const formData = new FormData()

  for (const convertionId of convertionIds) {
    formData.append("convertion_id", convertionId)
  }

  const fetchOptions = {
    method: "post",
    credentials: "include",
    body: formData
  }

  const response = await requestDownloadAllConvertedFiles(fetchOptions)

  return response
}

export default downloadAllConvertedFiles