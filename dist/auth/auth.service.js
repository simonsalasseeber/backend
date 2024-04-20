"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../users/users.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    getAuth() {
        return "this is my auth";
    }
    async signIn(logindto) {
        const { email, password } = logindto;
        if (!email || !password) {
            return "missing email/password";
        }
        const user = await this.usersRepository.getUserByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException("user not found");
        }
        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new common_1.BadRequestException("error with your password");
        }
        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        };
        const token = this.jwtService.sign(payload);
        return {
            token,
            message: "successfull login"
        };
    }
    async signUp(user) {
        const { email, password } = user;
        const foundUser = await this.usersRepository.getUserByEmail(email);
        if (foundUser) {
            throw new common_1.BadRequestException('you already have an account');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        return await this.usersRepository.addUser({
            ...user,
            password: passwordHash,
            isAdmin: false
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map