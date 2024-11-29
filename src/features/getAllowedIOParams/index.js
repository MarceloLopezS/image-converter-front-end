import requestAllowedIOParams from "./api"

const getAllowedIOParams = async () => {
  const fetchOptions = {
    method: "get",
    credentials: "include"
  }

  const response = await requestAllowedIOParams(fetchOptions)
  const data = await response.json()

  return data
}

export default getAllowedIOParams