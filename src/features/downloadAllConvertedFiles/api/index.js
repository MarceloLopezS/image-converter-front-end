import { API_URL, API_ENDPOINT } from "@shared/utils/constants"

const requestDownloadAllConvertedFiles = async (fetchOptions) => {
  const request = new Request(
    `${API_URL}${API_ENDPOINT.DOWNLOAD_ALL_CONVERTED_FILES}`,
    fetchOptions
  )

  const response = await fetch(request)

  return response
}

export default requestDownloadAllConvertedFiles