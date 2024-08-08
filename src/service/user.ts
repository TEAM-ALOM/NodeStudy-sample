import { UserModel, UserSchema } from "../schema/user";
import { UserType } from "../types/user";

// 이 서비스 레이어에서 발생해 throw된 모든 err는 핸들러를 거칩니다.
export class UserService {
  async post(data: UserType): Promise<UserType> {
    try {
      const user: UserType = await UserModel.create(data);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getOne(id: string): Promise<UserType | null> {
    try {
      const user: UserType | null = await UserModel.findById(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getAll(): Promise<UserType[]> {
    try {
      const users: UserType[] = await UserModel.find();
      return users;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, data: Partial<UserType>): Promise<UserType | null> {
    try {
      const user: UserType | null = await UserModel.findByIdAndUpdate(id, data, { new: true });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<UserType | null> {
    try {
      const user: UserType | null = await UserModel.findByIdAndDelete(id);
      return user;
    } catch (err) {
      throw err;
    }
  }
}
