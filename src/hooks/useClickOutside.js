import { useEffect } from "react"
const elementRoot = document.documentElement;

export const useClickOutside = (targetRef, callBack ) => {
  const handleClick = (e) => {
    if (e.target !== targetRef.current) {
      callBack()
    }
  }
  useEffect(() => {
    elementRoot.addEventListener("click", handleClick)
    return () => {
      elementRoot.removeEventListener("click", handleClick)
    }
  })
} 