export default function Button({
  children,
  variant = 'primary',
  as: Component = 'button',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg focus:ring-primary-500',
    secondary:
      'bg-white text-slate-700 border border-slate-200 hover:border-primary-300 hover:bg-slate-50 shadow-sm focus:ring-slate-200',
    outline:
      'bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40 focus:ring-white/50',
  }

  return (
    <Component
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
