import { MouseEvent, ReactNode } from 'react'

type ButtonProps = {
  type: HTMLButtonElement['type'],
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  color?: string
  padding?: string
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className,
  disabled,
  loading,
  onClick,
  children,
  color = "white",
  padding = "px-4 py-3"
}) => {
  return (
    <button
    className={`flex items-center justify-center gap-2 bg-blue-900 rounded-md transition-all duration-300 text-${color} ${padding}
      ${loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
      ${className ? className : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button