import { Hono } from "hono";
import z from "zod";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

type Variables = {
  userId: string;
};

const zodBlog = z.object({
  content: z.string(),
  title: z.string(),
  thumbnail: z.string().optional(),
  published: z.boolean(),
});

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
    return c.text("Unauthorized user");
  }

  const token = reqHeader.split(" ")[1];
  const decodedToken = decode(token);

  c.set("userId", decodedToken.payload.id);

  await next();
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log(body);

  const userId = c.get("userId");
  const { success } = zodBlog.safeParse(body);

  if (success) {
    try {
      const blog = await prisma.blog.create({
        data: {
          ...body,
          authorId: +userId,
        },
      });

      return c.json({
        status: 201,
        message: "Created Blog Successfully :)",
      });
    } catch (error: any) {
      c.status(500);
      return c.text(error.message);
    }
  }

  return c.text("Invalid Data");
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
