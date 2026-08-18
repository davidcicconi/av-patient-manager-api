export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public lastName: string,
    public email: string,
    public hashPassword: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public roleId?: number,
  ) {}

  changeEmail(email: string): void {
    this.email = email;
  }

  changePassword(password: string): void {
    this.hashPassword = password;
  }
}
