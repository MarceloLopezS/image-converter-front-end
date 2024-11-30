import requestUploadFilesToConvert from "./api"

const uploadFilesToConvert = async ({ files, filesConfig }) => {
  const formData = new FormData()
  for (const file of files) {
    formData.append("files", file)
  }
  formData.append("files_config", JSON.stringify(filesConfig))

  const fetchOptions = {
    method: "post",
    credentials: "include",
    body: formData
  }

  const response = await requestUploadFilesToConvert(fetchOptions)
  const data = response.json()

  return data
}

export default uploadFilesToConvert