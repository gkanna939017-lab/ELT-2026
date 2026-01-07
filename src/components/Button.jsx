export default function Button({
  children,
  variant = 'primary',
  as: Component = 'button',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-300',
    secondary:
      'bg-white text-primary-700 border border-primary-200 hover:border-primary-300 shadow-sm',
  }

  return (
    <Component
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
