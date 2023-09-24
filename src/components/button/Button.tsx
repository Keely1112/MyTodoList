import { Button as MantineButton } from "@mantine/core"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // children: React.ReactNode
}

//包含原生button的屬性
function Button({ ...props }: Props) {
  return <MantineButton {...props}>{props.children}</MantineButton>
}

export default Button
