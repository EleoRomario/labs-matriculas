export const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-[url('/bg.svg')] bg-cover">{children}</div>
  )
}
