import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";
import { ITokenService } from "../../services/interfaces/ITokenService";

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("Invalid credentials");

    const valid = await this.passwordHasher.compare(password, user.password);

    if (!valid) throw new Error("Invalid password");

    const accessToken = await this.tokenService.generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }
}
