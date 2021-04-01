export interface IResultList {
  id: number
  name: string
  nickname?: string
  community: string
  email: string
  emailOpen?: string // boolean?
  mobile?: string
  mobileOpen?: string // boolean?
  profileUrl?: string
  status?: string
  createdAt?: string
}
export interface ISearchObj {
  name?: string
  email?: string
}
