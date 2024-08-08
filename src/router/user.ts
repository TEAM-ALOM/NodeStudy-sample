import { NextFunction, Router, Response, Request } from "express";
import { UserService } from "../service/user";
import { UserType } from "../types/user";
import { ResponseType } from "../types/response";

const UserRouter: Router = Router();
const userservice: UserService = new UserService();

UserRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    // 원래 body에는 UserType이 담길것이 예상되지만 express에서 body는 ReadableStream이라는 복잡한 형식입니다.
    // 따라서 당장은 any로 처리하며, 이를 해결하기 위해선 @types/express의 body 타입을 수정해야 합니다.
    const { body }: any = req;
    const user: UserType = await userservice.post(body as UserType);

    const result: ResponseType<UserType> = {
      message: "회원가입에 성공하였습니다.",
      data: user,
    };

    res.status(201).json(result);
  }

);

UserRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const user: UserType | null = await userservice.getOne(id);

    if (!user) {
      const result: ResponseType<null> = {
        message: "사용자를 찾을 수 없습니다.",
        data: null,
      };
      res.status(404).json(result);
      return;
    }

    const result: ResponseType<UserType> = {
      message: "사용자 조회에 성공하였습니다.",
      data: user,
    };

    res.status(200).json(result);
  }
);

UserRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const users: UserType[] = await userservice.getAll();

    const result: ResponseType<UserType[]> = {
      message: "사용자 목록 조회에 성공하였습니다.",
      data: users,
    };

    res.status(200).json(result);
  }
);

UserRouter.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    // 여기서도 마찬가지로 body는 UserType의 Partial Type으로 예상합니다.
    const { body }: any = req;
    const { id } = req.params;
    const updatedUser: UserType | null = await userservice.update(id, body as Partial<UserType>);

    if (!updatedUser) {
      const result: ResponseType<null> = {
        message: "사용자를 찾을 수 없습니다.",
        data: null,
      };
      res.status(404).json(result);
      return;
    }

    const result: ResponseType<UserType> = {
      message: "사용자 수정에 성공하였습니다.",
      data: updatedUser,
    };

    res.status(200).json(result);
  }
);

UserRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedUser: UserType | null = await userservice.delete(id);

    if (!deletedUser) {
      const response: ResponseType<null> = {
        message: "사용자를 찾을 수 없습니다.",
        data: null,
      };
      res.status(404).json(response);
      return;
    }

    const result: ResponseType<UserType> = {
      message: "사용자 삭제에 성공하였습니다.",
      data: deletedUser,
    };

    res.status(200).json(result);
  }
);

export default UserRouter;