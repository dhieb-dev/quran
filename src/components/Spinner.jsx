const effectLoding = [
  { delay: { animationDelay: 0 } },
  { delay: { animationDelay: 150 + "ms" } },
  { delay: { animationDelay: 300 + "ms" } },
]
export const Spinner = ({ className }) => {
  return (
    <div className={`${className} flex justify-center items-center h-40 space-x-4 space-x-reverse`}>
      {effectLoding.map(({ delay , message}, index) => <div key={index} className="h-4 w-4 bg-gradient-to-tr to-slate-700 from-neutral-100 dark:to-slate-200 dark:from-slate-900 rounded-full animate-spin" style={delay}>{message}</div>)}
    </div>
  )
}
