
import * as z from "zod";

export const MessagePayload = z.object({
    text: z.string()
})


export interface Message {
    timestamp: number;
    username: string;
    payload: z.infer<typeof MessagePayload>;
}