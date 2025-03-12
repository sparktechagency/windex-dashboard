import { z } from "zod";
import { imageFileSchema, imageFileSchemaOptional } from "./imageFileSchema";

const addProductValidationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  price: z.coerce
    .number({ required_error: "Price is required" })
    .min(1, { message: "Price is required" }),
  stock: z.coerce.number({ required_error: "Stock is required" }),
  image: imageFileSchema,
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" }),
});

const editProductValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(),
  price: z.coerce.number().min(1, { message: "Price is required" }).optional(),
  image: imageFileSchemaOptional,
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .optional(),
  stock: z.coerce.number().optional(),
});

export const productValidationSchema = {
  addProductValidationSchema,
  editProductValidationSchema,
};
