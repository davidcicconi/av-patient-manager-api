import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";
import { LoginRequestDto } from "../../dtos/auth/LoginRequestDto";
import { ITokenService } from "../../services/interfaces/ITokenService";
import { AuthenticatedUser, LoginResponseDTO } from "../../dtos/auth/LoginResponseDto";

@injectable()
export class LoginUseCase {
  constructor(
    @inject("IUserRepository") private readonly userRepository: IUserRepository,
    @inject("IPasswordHasher") private readonly passwordHasher: IPasswordHasher,
    @inject("ITokenService") private readonly tokenService: ITokenService,
  ) {}

  async execute(request: LoginRequestDto): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) throw new Error("Invalid user");

    const valid = await this.passwordHasher.compare(request.password, user.hashPassword);

    if (!valid) throw new Error("Invalid password");

    const accessToken = await this.tokenService.generateAccessToken(user);

    const refreshToken = await this.tokenService.generateRefreshToken(user.id)
    return {
      user: {
        id: user.id!,
        email: user.email,
        roleId: user.roleId!
      } as AuthenticatedUser,
      token: accessToken,
      refreshToken,
      expiresIn: 15 * 60
    };
  }
}
