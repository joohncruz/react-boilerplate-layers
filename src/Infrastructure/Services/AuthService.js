import AuthRepository from 'Infrastructure/Repositories/AuthRepository';

class AuthService {
  constructor(authRepository = new AuthRepository()) {
    this.authRepository = authRepository;
  }

  async login({ email, password }) {
    try {
      if(!email || !password) {
        return Promise.reject("Usuario Invalido");
      }

      const { data } = await this.authRepository.post({ email, password });
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default AuthService;