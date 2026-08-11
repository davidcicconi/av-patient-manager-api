export class UserModel {
  constructor(
    public id: number | null,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public roleId?: number,
  ) {}

  changeEmail(email: string): void {
    this.email = email;
  }

  changePassword(password: string): void {
    this.password = password;
  }
}
