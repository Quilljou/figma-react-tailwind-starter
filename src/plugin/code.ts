declare const SITE_URL: string

figma.showUI(`<script>window.location.href = '${SITE_URL}'</script>`, {
  width: 400,
  height: 700,
})

figma.on('selectionchange', () => {
  figma.ui.postMessage({
    type: 'onSelection',
  })
})

figma.ui.onmessage = async (message, props) => {
  if (props.origin !== SITE_URL) {
    return
  }

  switch (message.type) {
    case 'EVAL': {
      const fn = eval.call(null, message.code)

      try {
        const result = await fn(figma, message.params)
        figma.ui.postMessage({
          type: 'EVAL_RESULT',
          result,
          id: message.id,
        })
      } catch (e) {
        figma.ui.postMessage({
          type: 'EVAL_REJECT',
          error: typeof e === 'string' ? e : e && typeof e === 'object' && 'message' in e ? e.message : null,
          id: message.id,
        })
      }

      break
    }
  }
}

export {}
