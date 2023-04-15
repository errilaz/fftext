import { MouseEvent } from "react"
import { useHost } from "./HostProvider"

export default function Link({ href, children, ...props }: PropsOf<"a"> & { href: string }) {
  const { openBrowser } = useHost()

  const handleClick = (event: MouseEvent) => {
    event.preventDefault()
    openBrowser(href)
  }

  return (
    <a
      {...props}
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}