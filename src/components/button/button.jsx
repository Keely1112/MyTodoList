import { Button as MantineButton } from '@mantine/core';

function Button({ onClick, className, children }) {

  return (
    <MantineButton 
      onClick={onClick} 
      className={className}
    > 
      {children} 
    </MantineButton>
  )
}

export default Button