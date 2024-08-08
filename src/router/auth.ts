import { NextFunction, Request, Response, Router } from "express";
import { UserService } from "../service/user";
import jwt from "jsonwebtoken";

const AuthRouter = Router();

const userservice = new UserService();

AuthRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { body }: any = req;
    const user = await userservice.getOne(body.id);
    if (!user) {
      throw new Error('Unauthorized');
    }
    if (user.password !== body.password) {
      throw new Error('Bad_Request');
    }
    const token = jwt.sign(
      {
        type: "JWT",
        id: user.id,
      },
      "1234qwer",
      {
        expiresIn: "30m",
        issuer: "Arom",
      }
    );

    const result = {
      message: "로그인에 성공하였습니다.",
      data: token,
    };

    return res.send(result);
  }
);

export default AuthRouter;
