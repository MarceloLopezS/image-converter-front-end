import { API_ENDPOINT, API_URL } from "@shared/utils/constants"

const requestOutputFormatParams = async (fetchOptions) => {
  const request = new Request(
    `${API_URL}${API_ENDPOINT.OUTPUT_FORMAT_PARAMS}`,
    fetchOptions
  )
  const response = await fetch(request)

  return response
}

export default requestOutputFormatParams