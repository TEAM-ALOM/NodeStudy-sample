/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: 로그인 API
 *   - name: user
 *     description: 사용자 API
 *
 * components:
 *   schemas:
 *     UserType:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         password:
 *           type: string
 *     ResponseType:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: any
 *
 * @swagger
 * /auth:
 *   post:
 *     tags: [auth]
 *     summary: 로그인 api
 *     description: 아이디와 비번을 확인하고 토큰을 반환합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserType"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseType"
 *
 * @swagger
 * /user:
 *   post:
 *     tags: [user]
 *     summary: 회원가입 api
 *     description: 사용자를 생성하고 반환합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserType"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseType"
 */
