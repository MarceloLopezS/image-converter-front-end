import { API_ENDPOINT, API_URL } from "@shared/utils/constants"

const requestAllowedIOParams = async (fetchOptions) => {
  const request = new Request(
    `${API_URL}${API_ENDPOINT.ALLOWED_IO_PARAMS}`,
    fetchOptions
  )
  const response = await fetch(request)

  return response
}

export default requestAllowedIOParams