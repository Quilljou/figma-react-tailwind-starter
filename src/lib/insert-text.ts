import { figmaAPI } from './figma-api'

export async function insertTextToCanvas(text: string) {
  figmaAPI.run(
    async (figma, { text }: { text: string }) => {
      if (!text) return
      const selectedNode = figma.currentPage.selection[0]
      const selectedTextRange = figma.currentPage.selectedTextRange
      const hasSelectedText = selectedTextRange?.start !== selectedTextRange?.end

      if (selectedNode && selectedNode.type === 'TEXT') {
        if (hasSelectedText) {
          selectedNode.characters = text
        } else {
          selectedNode.characters += text
        }
      } else {
        // const frame = figma.createFrame()

        const textNode = figma.createText()

        // 设置节点的初始宽度和高度
        textNode.resize(300, 100) // 初始高度设置为100，稍后会调整

        // 等待文本节点渲染并调整其高度
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
        textNode.characters = text
        // 设置文本节点的宽度
        const newHeight = textNode.absoluteRenderBounds?.height || 100
        textNode.resize(300, newHeight + 10)

        // 将节点选中，以便在 Figma 中查看
        figma.currentPage.selection = [textNode]
        figma.viewport.scrollAndZoomIntoView([textNode])
        figma.currentPage.appendChild(textNode)
      }
    },
    { text },
  )
}
