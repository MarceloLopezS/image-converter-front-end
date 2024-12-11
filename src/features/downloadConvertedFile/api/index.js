import { API_URL, API_ENDPOINT } from "@shared/utils/constants"

const requestDownloadFile = async (fetchOptions) => {
  const request = new Request(
    `${API_URL}${API_ENDPOINT.DOWNLOAD_CONVERTED_FILE}`,
    fetchOptions
  )

  const response = await fetch(request)

  return response
}

export default requestDownloadFile