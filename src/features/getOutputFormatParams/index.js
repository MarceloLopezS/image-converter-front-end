import requestOutputFormatParams from "./api"

const getOutputFormatParams = async (outputFormat) => {
  const fetchOptions = {
    method: "post",
    credentials: "include",
    body: { output_format: outputFormat }
  }

  const response = await requestOutputFormatParams(fetchOptions)
  const data = await response.json()

  return data
}

export default getOutputFormatParams