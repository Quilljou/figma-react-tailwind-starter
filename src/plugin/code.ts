figma.showUI(__html__, { themeColors: true, width: 400, height: 400 })

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rectangles') {
    const nodes = []

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle()
      rect.x = i * 150

      // Generate random pastel tone color
      const r = Math.floor(Math.random() * 100 + 155)
      const g = Math.floor(Math.random() * 100 + 155)
      const b = Math.floor(Math.random() * 100 + 155)
      rect.fills = [{ type: 'SOLID', color: { r: r / 255, g: g / 255, b: b / 255 } }]
      figma.currentPage.appendChild(rect)
      nodes.push(rect)
    }

    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)
  } else if (msg.type === 'select-nodes') {
    if (figma.currentPage.selection.length === 0) {
      figma.notify('Please select at least one node')
      return figma.closePlugin()
    }

    for (const node of figma.currentPage.selection) {
      console.log(node)
    }
  }

  figma.closePlugin()
}
