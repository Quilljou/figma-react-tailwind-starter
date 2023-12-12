import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'
import { copyToClipboard } from 'figx'
import { IconButton } from './icon-button'
import { ICON_SIZE } from 'src/lib/constants'

interface CopyToClipboardButtonProps {
  text: string
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleClick = () => {
    copyToClipboard(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <IconButton tooltip={isCopied ? 'Copied' : 'Copy to clipboard'} onClick={handleClick}>
      {isCopied ? <Check size={ICON_SIZE} /> : <Copy size={ICON_SIZE} />}
    </IconButton>
  )
}
