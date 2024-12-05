import { useState } from "react"

const useNotification = notificationDisplayTime => {
  let notificationTimeout

  const [isVisible, setIsVisible] = useState(false)

  const setVisibleNotification = () => {
    clearTimeout(notificationTimeout)

    setIsVisible(true)

    notificationTimeout = setTimeout(
      () => setIsVisible(false),
      notificationDisplayTime
    )
  }

  return { isNotificationVisible: isVisible, setVisibleNotification }
}

export default useNotification
