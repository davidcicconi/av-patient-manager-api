export class User {
  constructor(
    public id: number | null,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  changeEmail(email: string): void {
    this.email = email;
  }

  changePassword(password: string): void {
    this.password = password;
  }
}
