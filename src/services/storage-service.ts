import { Plugins } from '@capacitor/core'
import { config } from '../config'
import { decrypt, encrypt } from '../utils/encrypt-util'
const { Storage } = Plugins

class StorageService {
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN'
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN'

  async getAccessToken(): Promise<string> {
    const token = await this.getObject(this.ACCESS_TOKEN)

    if (!token) {
      return ''
    }
    // 암호화된 accessToken을 복호화해서 리턴
    return decrypt(token, config.KEY.ENCRYPT_SECRET)
  }

  setAccessToken(accessToken: string): Promise<void> {
    console.log('storage setAccessToken', accessToken)
    console.log(
      '암호화해서 저장',
      this.setObject(this.ACCESS_TOKEN, encrypt(accessToken, config.KEY.ENCRYPT_SECRET))
    )

    return this.setObject(this.ACCESS_TOKEN, encrypt(accessToken, config.KEY.ENCRYPT_SECRET))
  }

  async getRefreshToken(): Promise<string> {
    const token = await this.getObject(this.REFRESH_TOKEN)
    if (!token) {
      return ''
    }
    return decrypt(token, config.KEY.ENCRYPT_SECRET)
  }

  setRefreshToken(refreshToken: string): Promise<void> {
    return this.setObject(this.REFRESH_TOKEN, encrypt(refreshToken, config.KEY.ENCRYPT_SECRET))
  }

  // eslint-disable-next-line
  private async setObject(key: string, value: any) {
    await Storage.set({
      key,
      value: JSON.stringify(value),
    })
  }

  private async getObject(key: string) {
    const ret = await Storage.get({ key })
    if (!ret.value) {
      return null
    }
    return JSON.parse(ret.value)
  }
}

export const storage = new StorageService()
