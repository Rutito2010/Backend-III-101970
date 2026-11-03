import usersRepo from '../repositories/users.repo.js';
import { USER_ROLES, DOCUMENT_TYPES } from '../constants/index.js';
import {createError, ErrorDictionary} from "../utils/errors.js"
import logger from '../utils/logger.js'; 

const USERS_RELATED_DOCUMENTS = [
  DOCUMENT_TYPES.DRIVER_LICENSE,
  DOCUMENT_TYPES.USER_DOCUMENT
]
class UsersService {

  async addDocument(id, file, type){
    if(!file) throw createError(ErrorDictionary.FILE_REQUIRED);
    if(!USERS_RELATED_DOCUMENTS.includes(type)) throw createError(ErrorDictionary.FILE_REQUIRED);

    const user = await usersRepo.findById(id)
    if (!user) {
      throw createError(ErrorDictionary.USER_NOT_FOUND)
    }
    /**
     * validacion de que un user customer no pueda subir una licecia de conducir 
     */

    user.documents.push({
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
      mimeType: file.mimetype,
      size: file.size,
      type,
      uploadedAt: new Date()
    })

    return usersRepo.update(id, {documents: user.documents})
  }

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
