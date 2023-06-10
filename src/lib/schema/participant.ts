import { z } from "zod";

export const ParticipantSchema = z.object({
    votingId: z.string().max(16),
    ip: z.string().ip(),
    selected: z.string().max(16),
})

export type Participant = z.infer<typeof ParticipantSchema>