export type BaseErrorType = 'paramError' | 'noCredits' | 'invalidLicense' | 'networkError'

export class BaseError extends Error {
  constructor(public type: BaseErrorType, public message: string) {
    super()
  }
}

export async function handleError(resp: Response) {
  if (!resp.ok) {
    const error = await resp.json().catch(() => ({}))
    const type = error?.error?.type as BaseErrorType
    // if (type === 'noCredits') {
    // }
    throw error?.error || error
  }
}
