import { Link, useRouteError } from 'react-router-dom'
import { Button } from '../ui/button'

export default function ErrorPage() {
  const error = useRouteError() as any

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-left">
      <h1>{'oops'}</h1>
      <p>{'title'}</p>
      <p className="font-mono">
        <span className="mr-2">{error?.status}</span>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Button asChild>
        <Link to="/">{'backtohomepage'}</Link>
      </Button>
    </div>
  )
}
