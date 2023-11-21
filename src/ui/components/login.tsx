import { SendIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'

export function Login() {
  const [email, setEmail] = useState<string>('')
  function handleSend() {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'input-email',
          data: {
            email,
          },
        },
      },
      '*',
    )

    window.addEventListener('message', function (e: MessageEvent) {
      const newMessage = e.data.pluginMessage
      if (newMessage.type === 'login-success') {
        const exampleData = newMessage?.data || ''
        console.log('response from main', exampleData)
      }
    })
  }

  return (
    <div className="flex p-4">
      <Input onChange={(e) => setEmail(e.target.value)} value={email}></Input>
      <Button size="icon" variant={'ghost'} onClick={handleSend}>
        <SendIcon />
      </Button>
    </div>
  )
}
