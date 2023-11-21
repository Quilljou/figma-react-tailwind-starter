figma.showUI(__html__, { themeColors: true, width: 400, height: 400 })

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case 'input-email':
      console.log('received from ui', msg.data)
      figma.ui.postMessage({ type: 'login-success', data: msg.data })
      break
    default:
      break
  }
}
