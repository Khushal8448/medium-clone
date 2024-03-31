import { Hono } from "hono";
import z from "zod";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {
  zodSignup,
  zodSignin,
  type signinInput,
  type signupInput,
} from "@khushal_0111/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// const zodSignup = z.object({
//   username: z.string().email(),
//   password: z.string().min(6),
//   firstName: z.string().min(1),
//   lastName: z.string().optional(),
// });

// const zodSignin = z.object({
//   username: z.string().email(),
//   password: z.string().min(6),
// });

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: signupInput = await c.req.json();
  const { success } = zodSignup.safeParse(body);

  if (success) {
    try {
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          firstName: body.firstName,
          lastName: body.lastName,
        },
      });

      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log(jwt);

      return c.json({ jwt });
    } catch (error: any) {
      c.status(403);
      return c.text(error.message);
    }
  }

  return c.text("Invalid Inputs!!");
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: signinInput = await c.req.json();

  const { success } = zodSignin.safeParse(body);

  if (success) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: body.username,
          password: body.password,
        },
      });

      if (!user) {
        c.status(403);
        return c.text(`Incorrect credentials`);
      }

      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log(jwt);

      return c.json({ jwt });
    } catch (error: any) {
      c.status(403);
      return c.text(error.message);
    }
  }

  return c.text("Invalid Inputs!!");
});
