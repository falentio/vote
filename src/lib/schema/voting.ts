import { z } from "zod";
import { ParticipantSchema } from "./participant";
import { id } from "$lib/utils/id";

export const VotingSchema = z.object({
    id: z.string().max(16).default(() => id()),
    name: z.string().max(32),
    description: z.string().max(256),
    secret: z.string().max(32).default(() => id()),
    open: z.boolean().default(true),
    multi: z.boolean().default(false),
    created: z.coerce.date().default(() => new Date()),
    options: z.string().max(16).array().max(16).default(() => []),
    participants: z.lazy(() => ParticipantSchema).array().default(() => [])
})

export type Voting = z.infer<typeof VotingSchema>

export const VotingCreateSchema = VotingSchema.pick({
    name: true,
    description: true,
    options: true,
})

export type VotingCreate = z.infer<typeof VotingCreateSchema>
