export const TabSection = ({ title, onClick }) => {
  return (
    <li
      onClick={onClick}>
      {title}
    </li>
  )
}
