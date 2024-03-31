"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodUpdateBlog = exports.zodBlog = exports.zodSignin = exports.zodSignup = void 0;
const zod_1 = __importDefault(require("zod"));
exports.zodSignup = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    firstName: zod_1.default.string().min(1),
    lastName: zod_1.default.string().optional(),
});
exports.zodSignin = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.zodBlog = zod_1.default.object({
    content: zod_1.default.string(),
    title: zod_1.default.string(),
    thumbnail: zod_1.default.string().optional(),
    published: zod_1.default.boolean(),
});
exports.zodUpdateBlog = zod_1.default.object({
    content: zod_1.default.string(),
    title: zod_1.default.string(),
    id: zod_1.default.number(),
});
