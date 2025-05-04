export interface LoginResponse {
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
      // Agrega más campos si tu modelo de usuario tiene más
    };
  }
  