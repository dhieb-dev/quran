import { useEffect, useState } from "react"
export const IsOnline = () => {
  const [isOnline, setIsOnline] = useState(false)
  const online = () => {
    setIsOnline('Internet online')
    setTimeout(() => {
      window.location.reload()
      setIsOnline(false)
    }, 2000)
  }
  const offline = () => {
    setIsOnline('Internet offline!')
  }
  useEffect(() => {
    window.addEventListener('online', online)
    window.addEventListener('offline', offline)
    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', offline)
    }
  })
  return (
    <>
      {isOnline && <div className="px-3 py-1.5 rounded-full bg-rose-200 dark:bg-gray-700 border-2 border-gray-400 dark:border-rose-200 fixed left-1/2 -translate-x-1/2 bottom-24">{isOnline}</div>}
    </>
  )
}