import { z } from "zod";

export const messageSchema = z.object({
    id: z.string(),
    person: z.string(),
    email: z.string(),
    message: z.string(),
    recievedAt: z.number()
})

export const validateMessage = (data: unknown) => {
    return messageSchema.safeParse(data)
}