import z from "zod";

export const zodSignup = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
});

export const zodSignin = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const zodBlog = z.object({
  content: z.string(),
  title: z.string(),
  thumbnail: z.string().optional(),
  published: z.boolean(),
});

export const zodUpdateBlog = z.object({
  content: z.string(),
  title: z.string(),
  id: z.number(),
});

export type signupInput = z.infer<typeof zodSignup>;
export type signinInput = z.infer<typeof zodSignin>;

export type CreateBlogInput = z.infer<typeof zodBlog>;
export type UpdateBlogInput = z.infer<typeof zodUpdateBlog>;
