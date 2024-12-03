const DownloadSVG = ({ ...attributes }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      strokeWidth="1.5"
      {...attributes}
    >
      <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />
      <path d="M12 13l0 9" />
      <path d="M9 19l3 3l3 -3" />
    </svg>
  )
}

export default DownloadSVG
