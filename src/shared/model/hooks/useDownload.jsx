import { useEffect, useRef, useState } from "react"

const useDownload = (
  request = () => new Promise((res, rej) => res()),
  responseHandler = async (response, setHref) => null
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const linkRef = useRef(null)
  const [href, setHref] = useState(null)

  const download = async () => {
    setIsLoading(true)

    try {
      const response = await request()

      await responseHandler(response, setHref)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!linkRef.current || !href) return

    linkRef.current.click()
  }, [href])

  return {
    linkRef,
    download,
    href,
    isLoading,
    error
  }
}

export default useDownload
