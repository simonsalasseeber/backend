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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
let UsersRepository = class UsersRepository {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUsers(page, limit) {
        const offset = (page - 1) * limit;
        const users = await this.usersRepository.find();
        const usersWithoutPassword = users.map(({ password, ...user }) => user);
        return usersWithoutPassword.slice(offset, offset + limit);
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: [
                'orders',
                'orders.orderDetail'
            ]
        });
        if (!user) {
            return "couldn't find user";
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async getUserByEmail(email) {
        const allUsers = await this.usersRepository.find();
        const user = allUsers.find(user => user.email === email);
        return user;
    }
    async addUser(user) {
        const AddedUser = await this.usersRepository.save(user);
        ;
        const { password, ...userWithoutPassword } = AddedUser;
        return userWithoutPassword;
    }
    async updateUser(id, user) {
        await this.usersRepository.update(id, user);
        const foundUser = this.usersRepository.findOneBy({ id });
        return foundUser;
    }
    async deleteUser(id) {
        const user = await this.usersRepository.findOneBy({ id });
        await this.usersRepository.remove(user);
        return "user deleted successfully";
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map