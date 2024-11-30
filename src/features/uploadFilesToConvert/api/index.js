import { API_URL, API_ENDPOINT } from "@shared/utils/constants"

const requestUploadFilesToConvert = async (fetchOptions) => {
  const request = new Request(
    `${API_URL}${API_ENDPOINT.CONVERT}`,
    fetchOptions
  )
  const response = await fetch(request)

  return response
}

export default requestUploadFilesToConvert