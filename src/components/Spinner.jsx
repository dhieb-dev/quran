const effectLoding = [
  { delay: { animationDelay: 0 } },
  { delay: { animationDelay: 100 + "ms" } },
  { delay: { animationDelay: 200 + "ms" } },
  { delay: { animationDelay: 300 + "ms" } },
  { delay: { animationDelay: 400 + "ms" } },
  { delay: { animationDelay: 500 + "ms" } },
]
export const Spinner = ({ className }) => {
  return (
    <div className={`${className} flex flex-col space-y-3`}>
      {effectLoding.map(({ delay }, index) => <div key={index} className="h-10 bg-gradient-to-tr to-gray-200 from-neutral-100 dark:to-neutral-800 dark:from-neutral-900 rounded animate-pulse" style={delay}></div>)}
    </div>
  )
}
