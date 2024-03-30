import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("Hello SignUp");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("Hello SignIn");
});

app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono hihihi");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello all blog!");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono! hihihi");
});

export default app;

// postgresql://Medium_Serverless%20_Clone_owner:8gCUMYX2xBQo@ep-patient-violet-a1q3gnnu.ap-southeast-1.aws.neon.tech/Medium_Serverless%20_Clone?sslmode=require

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNjg3ZDc2OGEtZmRlOS00Y2QxLWJlZTUtZWFmMDA0MTNiNThmIiwidGVuYW50X2lkIjoiYzg3YjBkZjg0MTkxNGNhZjJiNmI4ZWZkZTAzM2RiYjYxNjViMjc0ODgwMTEyZGU1NDdhMzEyMDViNjFkMjQ5NyIsImludGVybmFsX3NlY3JldCI6ImEwMTU0MDczLWViZDQtNGI4Yi1hMjE0LTM0MWNiZmMyMThlYyJ9.m4-BnvXG6CVwu9PmhRvI8LNq9_dKUmjT3HpuSwire24"
