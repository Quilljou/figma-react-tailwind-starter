import React, { ComponentProps } from 'react'
import { Button } from './ui/button'
import { ToolTips } from './ui/tooltip'

type Props = ComponentProps<typeof Button> & {
  tooltip: string
}

export function IconButton({ tooltip, children, ...rest }: Props) {
  return (
    <ToolTips content={tooltip}>
      <Button size={'icon'} variant={'ghost'} className="text-zinc-500" {...rest}>
        {children}
      </Button>
    </ToolTips>
  )
}
