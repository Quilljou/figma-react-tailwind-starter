import { figmaAPI } from './figma-api'

export async function getTextSelections(max = 5) {
  return figmaAPI.run(
    (figma, { max }: { max: number }) => {
      const selections = figma.currentPage.selection.slice(0, max)
      if (figma.currentPage.selection.length > max) {
        figma.notify(`Currently supports up to ${max} root layers`)
      }
      function nanoid(): string {
        // 生成随机字符数组
        const characters = '0123456789abcdef'
        const charactersLength = characters.length
        const randomChars = Array.from({ length: 32 }, () => characters[Math.floor(Math.random() * charactersLength)])

        // 插入连接符
        randomChars[12] = '4' // UUID 的版本号
        randomChars[16] = characters[(parseInt(randomChars[16], 16) & 3) | 8] // UUID 的变体号

        // 将字符数组拼接为 UUID 字符串
        const chunks = [
          randomChars.slice(0, 8),
          randomChars.slice(8, 12),
          randomChars.slice(12, 16),
          randomChars.slice(16, 20),
          randomChars.slice(20),
        ]
        return chunks.map((chunk) => chunk.join('')).join('-')
      }

      const findTextNodes = (nodes: readonly SceneNode[]): TextNode[] => {
        let result: TextNode[] = []
        for (const node of nodes) {
          if (node.type === 'TEXT') {
            result.push(node)
          }
          // @ts-ignore
          if (node?.children) {
            // @ts-ignore
            result = result.concat(findTextNodes(node.children as SceneNode[]))
          }
        }
        return result
      }

      const textNodes = findTextNodes(selections)
      const idMap: Record<string, string> = {}

      const textMap = textNodes.reduce((prev, next) => {
        if (next.characters?.trim().length) {
          const id = nanoid()
          idMap[id] = next.id
          return {
            ...prev,
            [id]: next.characters,
          }
        }
        return { ...prev }
      }, {})

      return {
        textMap,
        idMap,
        nodes: textNodes.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        }),
      }
    },
    { max },
  )
}
