import usersRepo from '../repositories/users.repo.js';
import { USER_ROLES } from '../constants/index.js';
import {createError, ErrorDictionary} from "../utils/errors.js"
import logger from '../utils/logger.js'; 
class UsersService {
  async findAll() {
    return usersRepo.findAll();
  }

  async findById(id) {
    logger.debug(`Buscando ususario con id: ${id}` )
    const user = await usersRepo.findById(id);
    if (!user) {
      throw createError(ErrorDictionary.USER_NOT_FOUND)
    }
    return user;
  }

  async create(userData) {
    if (userData.role === USER_ROLES.ADMIN) {
      throw createError(ErrorDictionary.ADMIN_CREATION_FORBIDDEN)
      
    }

    const existingUser = await usersRepo.findByEmail(userData.email);
    if (existingUser) {
      throw createError(ErrorDictionary.USER_ALREADY_EXISTS)
    }

    const newUser = await usersRepo.create(userData);
    return newUser;
  }

  async update(id, userData) {
    const updatedUser = await usersRepo.update(id, userData);
    if (!updatedUser) {
      throw createError(ErrorDictionary.USER_NOT_FOUND)
    }
    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await usersRepo.delete(id);
    if (!deletedUser) {
      throw createError(ErrorDictionary.USER_NOT_FOUND)
    }
    return deletedUser;
  }
}

export default new UsersService();
