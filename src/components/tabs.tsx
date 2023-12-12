import { useUIStore } from 'src/stores/ui'
import { Header } from './header'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function AppTabs() {
  const { licenseKey, setLicenseKey } = useUIStore()

  return (
    <>
      <Header />
      <div className="box-border w-full p-4">
        <Label>License</Label>
        <div className="my-2">{licenseKey}</div>
        <Input
          onBlur={(e) => {
            console.log(e.target.value)
            setLicenseKey(e.target.value)
          }}
        ></Input>
      </div>
    </>
  )
}
