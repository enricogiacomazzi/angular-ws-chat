
import * as z from "zod";

export const IncomingMessage = z.object({
    text: z.string(),
    username: z.string()
});

export const StoreMessage = IncomingMessage.extend({
    timestamp: z.number()
})


export type Message = z.infer<typeof StoreMessage>;