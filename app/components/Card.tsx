interface Props {
  children: React.ReactNode
  title: string
}

export const Card = ({ children, title }: Props) => {
  return (
    <div
      className={
        'w-full p-2 overflow-hidden border-2 border-gray-100 border-solid rounded-[5px]'
      }
    >
      {title && <label className="font-bold">{title}</label>}
      <div>{children}</div>
    </div>
  )
}
