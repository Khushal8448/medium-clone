import { Hono } from "hono";
import z from "zod";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify } from "hono/jwt";
import { zodBlog, zodUpdateBlog } from "@khushal_0111/medium-common";

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
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ status: 400, message: "Unauthorized user" });
  }

  const token = authHeader.split(" ")[1];

  const verified = await verify(token, c.env.JWT_SECRET);
  console.log(verified);
  if (!verified) {
    return c.text("Unauthorized user");
  }

  c.set("userId", verified.id);

  await next();
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const { success } = zodBlog.safeParse(body);

  if (success) {
    try {
      await prisma.blog.create({
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

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = zodUpdateBlog.safeParse(body);

  if (success) {
    try {
      const blog = await prisma.blog.update({
        where: {
          id: body.id,
        },
        data: {
          ...body,
        },
      });

      return c.json({
        status: 201,
        message: "Updated Blog Successfully :)",
      });
    } catch (error: any) {
      c.status(500);
      return c.text(error.message);
    }
  }

  return c.text("Invalid data");
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return c.json({
      status: 201,
      data: blogs,
    });
  } catch (error: any) {
    c.status(500);
    return c.text(error.message);
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.blog.findUnique({
      where: { id: +id },
    });

    return c.json({
      status: 201,
      data: blog,
    });
  } catch (error: any) {
    c.status(500);
    return c.text(error.message);
  }
});
