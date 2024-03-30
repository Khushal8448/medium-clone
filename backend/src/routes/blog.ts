import { Hono } from "hono";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono hihihi");
});

blogRouter.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello all blog!");
});

blogRouter.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono! hihihi");
});
