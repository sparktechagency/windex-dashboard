import { z } from "zod";

export const subAdminInvitationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  contractNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid contact number"),
});
