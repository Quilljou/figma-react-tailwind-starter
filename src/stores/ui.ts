import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { storage } from '../lib/storage'

type UIStore = {
  licenseKey?: string
  setLicenseKey: (licenseKey?: string) => any
}

export const useUIStore = create(
  persist<UIStore>(
    (set, get) => ({
      licenseKey: undefined,
      setLicenseKey: (licenseKey?: string) => {
        set(() => ({ licenseKey }))
      },
    }),
    {
      name: 'ui-store',
      //@ts-ignore
      partialize: (state) => ({
        licenseKey: state.licenseKey,
      }),
      storage: createJSONStorage(() => storage),
    },
  ),
)

useUIStore.persist.onFinishHydration((state) => {
  // do Something after hydration
})
