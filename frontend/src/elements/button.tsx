import { MouseEvent, ReactNode } from 'react'

type ButtonProps = {
  type: HTMLButtonElement['type'],
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className,
  disabled,
  loading,
  onClick,
  children,
}) => {
  return (
      <button
        className={`px-4 py-3 cursor-pointer justify-center bg-blue-900 text-white ${loading ? 'opacity-50' : 'opacity-100'} outline-none focus:outline-darkBlue ${className ? className : ''}`}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
      >
        <div className="flex items-center justify-center gap-2">
          {children}
        </div>
      </button>
  )
}

export default Button