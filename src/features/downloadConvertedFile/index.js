import requestDownloadFile from "./api"

const downloadConvertedFile = async (convertionId) => {
  const formData = new FormData()
  formData.append("convertion_id", convertionId)

  const fetchOptions = {
    method: "post",
    credentials: "include",
    body: formData
  }

  const response = await requestDownloadFile(fetchOptions)

  return response
}

export default downloadConvertedFile