import { Hono } from "hono";
import z from "zod";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const zodSignup = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
});

const zodSignin = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
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

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: z.infer<typeof zodSignin> = await c.req.json();

  const { success } = zodSignin.safeParse(body);

  if (success) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: body.username,
          password: body.password,
        },
      });

      if (user === null) return c.text("User does not exies!");

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
