export interface IUser {
  id: number
  name: string
  nickname: string
  community: string
  email: string
  emailOpen: string // boolean?
  mobile: string
  mobileOpen: string // boolean?
  profileUrl: string
  status: string
}

export interface ICommunityUser {
  id: number
  name: string
  nickname: string
  community: []
  email: string
  emailOpen: string // boolean?
  mobile: string
  mobileOpen: string // boolean?
  profileUrl: string
  status: string
  createdAt: string
  createdBy: string
  fcmToken: string
  isPublicEmail: boolean
  isPublicMobile: boolean
  isUse: boolean
  locale: string
  roles: string
  updatedAt: string
  updatedBy: string
}
