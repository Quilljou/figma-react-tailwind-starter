import { figmaAPI } from 'src/lib/figma-api'
import { useState, useCallback, useEffect } from 'react'

export function useSelection() {
  const [selection, setSelection] = useState<any[]>()

  const getSelection = useCallback(async () => {
    const ret = await figmaAPI.run(async () => {
      const result = figma.currentPage.selection?.map((item) => {
        return {
          name: item.name,
        }
      })
      return result
    })
    setSelection(ret)
  }, [])

  useEffect(() => {
    getSelection()

    const onMessage = async (e: MessageEvent) => {
      const message = e.data.pluginMessage
      if (message.type === 'onSelection') {
        getSelection()
      }
    }
    window.addEventListener('message', onMessage)

    return () => window.removeEventListener('message', onMessage)
  }, [getSelection])

  return {
    selection,
  }
}
