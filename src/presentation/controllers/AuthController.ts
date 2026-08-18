import { Controller, Post, SuccessResponse, Route, Response, Body } from "tsoa";
import { inject, injectable } from "tsyringe";
import { LoginUseCase } from "../../application/use-cases/auth/LoginUseCase";
import { LoginRequestDto } from "../../application/dtos/auth/LoginRequestDto";
import { LoginResponseDTO } from "../../application/dtos/auth/LoginResponseDto";

@injectable()
@Route('auth')
export class AuthController extends Controller {
    constructor(
        @inject(LoginUseCase) private readonly loginUseCase: LoginUseCase)
    {
        super();
    }

    @Post('login')
    @SuccessResponse(200, 'Login successful')
    @Response(400, 'Bad Request - Invalid input')
    @Response(401, 'Unauthorized - Invalid credentials')
    @Response(500, 'Internal Server Error')
    public async login(
        @Body() request: LoginRequestDto
    ): Promise<LoginResponseDTO> {
        return await this.loginUseCase.execute(request);
    }
}
