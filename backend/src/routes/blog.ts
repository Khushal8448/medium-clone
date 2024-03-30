import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

type Variables = {
  userId: string;
};

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables;
}>();

blogRouter.use(async (c, next) => {
  const reqHeader = c.req.header("Authorization");
  if (!reqHeader || !reqHeader.startsWith("Bearer ")) {
    return c.text("Unauthorized");
  }

  const token = reqHeader.split(" ")[1];
  const decodedToken = decode(token);

  c.set("userId", decodedToken.payload.id);

  await next();
});

blogRouter.post("/", (c) => {
  const userId = c.get("userId");
  console.log(userId);

  return c.text("Hello Hono!");
});

blogRouter.put("/", (c) => {
  return c.text("Hello Hono hihihi");
});

blogRouter.get("/bulk", (c) => {
  return c.text("Hello all blog!");
});

blogRouter.get("/:id", (c) => {
  return c.text("Hello Hono! hihihi");
});
