import { LANG_CONFIGS, LangCode, options } from './data'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from 'src/lib/utils'
import { Button } from '../ui/button'
import { useMemo, useState } from 'react'

export function LanguageSelector({
  language,
  setLanguage,
  showSameAsSource,
}: {
  language: string
  setLanguage: (value: LangCode) => void
  showSameAsSource?: boolean
}) {
  const [open, setOpen] = useState(false)

  const finalLangs = useMemo(() => {
    if (showSameAsSource) {
      return [{ name: 'Auto', value: 'sameAsSource' }, ...options]
    }
    return options
  }, [showSameAsSource])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          <span className="flex-1 truncate">
            {language ? finalLangs.find((lang) => lang.value === language)?.name : 'Select language...'}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[320px] w-[200px] p-0">
        <Command
          filter={(realValue: string, s: string) => {
            const name = LANG_CONFIGS[realValue as LangCode]?.name + LANG_CONFIGS[realValue as LangCode]?.nameEn
            if (!name) return 0
            return name.toLowerCase().includes(s.toLowerCase()) ? 1 : 0
          }}
        >
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup className="overflow-auto">
            {finalLangs.map((lang) => (
              <CommandItem
                key={lang.value}
                value={lang.value}
                className="text-left"
                onSelect={(currentValue: any) => {
                  setLanguage(currentValue)
                  setOpen(false)
                }}
              >
                <Check className={cn('mr-2 h-4 w-4', language === lang.value ? 'opacity-100' : 'opacity-0')} />
                <div>
                  <div className="font-semibold">{lang.name}</div>
                  <div className="text-xs">{(lang as any).nameEn || ''}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
