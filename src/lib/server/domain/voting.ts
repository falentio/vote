import { z } from "zod"
import { ParticipantSchema } from "./participant"

export const VotingSchema = z.object({
    id: z.string().uuid().default(() => crypto.randomUUID()),
    name: z.string(),
    description: z.string(),
    secret: z.string(),
    open: z.boolean().default(true),
    created: z.coerce.date().default(() => new Date()),
    participant: z.lazy(() => ParticipantSchema).array().default(() => [])
})

export type Voting = z.infer<typeof VotingSchema>

export interface VotingRepositoryRead {
    get(id: string): PromiseLike<Voting | null>
}

export interface VotingRepositoryWrite {
    create(voting: Voting): PromiseLike<void>
}

export interface VotingRepository extends VotingRepositoryRead, VotingRepositoryWrite { }

export interface VotingService {
    get(id: string): PromiseLike<Voting | null>
    create(voting: Voting): PromiseLike<Voting>
}