import { StateStorage } from 'zustand/middleware'
import { figmaAPI } from './figma-api'

export const storage: StateStorage = {
  getItem: function (key: string): string | Promise<string | null> | null {
    return figmaAPI.run(async (figma, key: string) => {
      const value = await figma.clientStorage.getAsync(key)
      return value
    }, key)
  },
  setItem: function (key: string, value: string): void | Promise<void> {
    return figmaAPI.run(
      async (figma, { key, value }: { key: string; value: string }) => {
        await figma.clientStorage.setAsync(key, value)
      },
      { key, value },
    )
  },
  removeItem: function (key: string): void | Promise<void> {
    return figmaAPI.run(async (figma, key: string) => {
      await figma.clientStorage.deleteAsync(key)
    }, key)
  },
}
