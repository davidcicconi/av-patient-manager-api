export interface AuthenticatedUser {
    id: number;
    email: string;
    roleId: number;
}

export interface LoginResponseDTO {
    user: AuthenticatedUser;
    token: string;
    refreshToken: string;
    expiresIn: number;
}
