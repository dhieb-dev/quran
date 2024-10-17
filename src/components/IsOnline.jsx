import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const IsOnline = () => {
  const [isOnline, setIsOnline] = useState(false)
  const navigate = useNavigate()
  const online = () => {
    setIsOnline('Internet online')
    setTimeout(() => navigate(0), 1000)
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
      {isOnline && <div className="px-3 py-1.5 rounded-lg bg-rose-200 dark:bg-gray-700 border-2 border-gray-400 dark:border-rose-200 fixed bottom-9">{isOnline}</div>}
    </>
  )
}