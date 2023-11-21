import { SendIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function Login() {
  return (
    <div className="flex p-4">
      <Input></Input>
      <Button size="icon" variant={'ghost'}>
        <SendIcon />
      </Button>
    </div>
  )
}
