export const TabSection = ({title, onClick}) => {
  return (
    <li 
    className="py-2 px-4"
    onClick={onClick}>{title}</li>
  )
}
