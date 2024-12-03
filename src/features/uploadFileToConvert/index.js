import requestUploadFileToConvert from "./api"

const uploadFileToConvert = async ({ file, fileConfig }) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("file_config", JSON.stringify(fileConfig))

  const fetchOptions = {
    method: "post",
    credentials: "include",
    body: formData
  }

  const response = await requestUploadFileToConvert(fetchOptions)
  const data = response.json()

  return data
}

export default uploadFileToConvert