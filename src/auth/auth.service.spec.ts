import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/users.dto';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/users.entity';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserRepository: Partial<UsersRepository>
  const mockUser: Omit<User, 'id' | 'isAdmin' | 'orders'> = {
    name: "Simon Salas 90",
    email: "simonsalas90@example.com",
    password: "P@ssw0rd!23",
    phone: 1234567890,
    country: "USA",
    address: "123 Main St",
    city: "New York"
  }

 
  beforeEach(async () => {
      mockUserRepository = {
      getUserByEmail: () => Promise.resolve(undefined),
      addUser: (user: Omit<UserDto, 'id'>): Promise<UserDto> =>
        Promise.resolve({
          ...user,
          isAdmin: false,
          id: '1234fs-234sd-24csfd-34sdfg'
        })
    }

    const mockJwtService = {
      sign: (payload) => jwt.sign(payload, 'testSecret')
    }
  

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, 
        { provide: JwtService, 
          useValue: mockJwtService 
        },
        {
          provide: UsersRepository,
          useValue: mockUserRepository
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create use with encrypted password', async () => {
    const user = await service.signUp(mockUser);
    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password)
  })

  it('signIn should return an error if the user is not found', async () => {
    try {
      const logindto = {
        email: mockUser.email,
        password: mockUser.password
      }
      await service.signIn(logindto);
    } catch (error) {
      expect(error.message).toEqual('user not found')
    }
  })

  it('signUp should return an error if the user already has an account', async () => {
    try {
      const userDto = {
        name: "Simon Salas 90",
        email: "simonsalas100@example.com",
        password: "P@ssw0rd!23",
        confirmPassword: "P@ssw0rd!23",
        phone: 1234567890,
        country: "USA",
        address: "123 Main St",
        city: "New York"
      }
      await service.signUp(userDto)
    } catch(error) {
      expect(error.message).toEqual('you already have an account')
    }
  })

  it('signIn should return a token and a message if login is successfull', async() => {
  
      const mockUserVariant = {
        ...mockUser,
        password: await bcrypt.hash(mockUser.password, 10)
      }
      
      

      mockUserRepository.getUserByEmail = (email: string) => Promise.resolve(mockUserVariant as User);

      const logindto = {
        email: mockUser.email,
        password: mockUserVariant.password
      }
      const response = await service.signIn(logindto)
      const responseWithToken = response as { token: string; message: string; };

      expect(response).toBeDefined;
      expect(responseWithToken.token).toBeDefined();
      expect(responseWithToken.message).toEqual("successfull login")
    })
});
