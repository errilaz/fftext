declare global {
  type PropsOf<Element extends keyof HTMLElementTagNameMap> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElementTagNameMap[Element]>, HTMLElementTagNameMap[Element]>
}

export {}
