import * as z from "zod";
import validator from "validator";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
    name: z.optional(z.string().min(1)),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)), 
    image: z.optional(z.string()),
    banner: z.optional(z.string()),
})
  .refine((data) => {
    if (data.password && !data.newPassword){
        return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  }) 

  .refine((data) => {
    if (data.newPassword && !data.password){
        return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  }) 

export const LoginSchema = z.object({
    email: z.string().email(),
    number: z.optional(z.string().refine(validator.isMobilePhone)),
    password: z.string().min(1 ,{
        message: "Password is required"
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email(),
    number: z.optional(z.string().refine(validator.isMobilePhone)),
    password: z.string().min(6 ,{
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email(),
    });

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
         message: "Minimum 6 characters required"
    }),
});

export const CreateAdSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    price: z
      .string()
      .regex(/^\d+$/, "Price must be a number")
      .transform((val) => parseFloat(val)),
    brand: z.string().min(1, "Brand is required"),
    description: z.string().min(40, "Description must be at least 40 characters"),
  });