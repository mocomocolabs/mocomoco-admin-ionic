export interface IAlert {
  isOpen: boolean
  header?: string
  message: string
  oneBtn?: boolean
  onSuccess?: () => void
  onFail?: () => void
}
