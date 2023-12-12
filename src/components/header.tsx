import { Crown, Rocket, User2 } from 'lucide-react'

export function Header() {
  const isPro = false
  return (
    <div className="flex w-full justify-end border-b p-4 ">
      <div className="flex cursor-pointer items-center gap-2">
        {!isPro ? (
          <>
            <Rocket size={16} className="text-primary" />
            <span className="inline-block bg-gradient-to-r  from-indigo-400 to-primary bg-clip-text text-transparent">
              Upgrade to Pro
            </span>
          </>
        ) : (
          <>
            <Crown size={16} className="text-primary" />
            <span className="text-primary">Pro</span>
          </>
        )}
        <User2 className={isPro ? 'text-primary' : 'text-zinc-500'} />
      </div>
    </div>
  )
}
