import z from "zod";
export declare const zodSignup: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    firstName: string;
    lastName?: string | undefined;
}, {
    username: string;
    password: string;
    firstName: string;
    lastName?: string | undefined;
}>;
export declare const zodSignin: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const zodBlog: z.ZodObject<{
    content: z.ZodString;
    title: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    content: string;
    title: string;
    published: boolean;
    thumbnail?: string | undefined;
}, {
    content: string;
    title: string;
    published: boolean;
    thumbnail?: string | undefined;
}>;
export declare const zodUpdateBlog: z.ZodObject<{
    content: z.ZodString;
    title: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    content: string;
    title: string;
    id: number;
}, {
    content: string;
    title: string;
    id: number;
}>;
export type signupInput = z.infer<typeof zodSignup>;
export type signinInput = z.infer<typeof zodSignin>;
export type CreateBlogInput = z.infer<typeof zodBlog>;
export type UpdateBlogInput = z.infer<typeof zodUpdateBlog>;
