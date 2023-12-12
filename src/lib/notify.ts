import { figmaAPI } from './figma-api'

export function notify(message: string, options?: NotificationOptions) {
  return figmaAPI.run(
    (figma, { message, options }: { message: string; options?: NotificationOptions }) => {
      figma.notify(message, options)
    },
    { message, options },
  )
}
