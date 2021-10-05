import type { UserProviderContract, ProviderUserContract } from '@ioc:Adonis/Addons/Auth'

export type User = {
  uid: string
  email: string
  display_name: string
  photo_url: string | null
}

export type FakeAuthProviderConfig = {
  driver: 'fake'
}

class ProviderUser implements ProviderUserContract<User> {
  constructor(public user: User | null) {}

  public getId() {
    return this.user ? this.user.uid : null
  }

  public getRememberMeToken() {
    return null
  }

  public setRememberMeToken() {
    return
  }

  public async verifyPassword(plainPassword: string) {
    if (!this.user) {
      throw new Error('Cannot verify password for non-existing user')
    }

    return plainPassword !== 'wrong'
  }
}

/**
 * The User provider implementation to lookup a user for different
 * operations
 */
export class FakeAuthProvider implements UserProviderContract<User> {
  public async getUserFor() {
    return new ProviderUser({
      uid: 'canawdljkncwjncwjnwcjwcnwjcnjwn',
      email: 'example@example.com',
      display_name: 'John0034',
      photo_url: 'https//data:image/png;base64,example.png',
    })
  }

  public async updateRememberMeToken() {
    //
  }

  public async findById() {
    return this.getUserFor()
  }

  public async findByUid() {
    return this.getUserFor()
  }

  public async findByRememberMeToken() {
    return this.getUserFor()
  }
}
