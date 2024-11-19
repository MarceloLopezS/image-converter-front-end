import requestOutputFormatParams from "./api"

const getOutputFormatParams = async (outputFormat) => {
  const formData = new FormData()
  formData.append("output_format", outputFormat)

  const fetchOptions = {
    method: "post",
    credentials: "include",
    body: formData
  }

  const response = await requestOutputFormatParams(fetchOptions)
  const data = await response.json()

  return data
}

export default getOutputFormatParams