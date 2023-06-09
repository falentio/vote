import { z } from "zod";

export const ParticipantSchema = z.object({
    votingId: z.string().uuid(),
    ip: z.string().ip(),
})

export type Participant = z.infer<typeof ParticipantSchema>

export interface ParticipantRepositoryRead {
    getAll(votingId: string): PromiseLike<Participant[]>
}

export interface ParticipantRepositoryWrite {
    create(participant: Participant): PromiseLike<void>
}

export interface ParticipantRepository extends ParticipantRepositoryRead, ParticipantRepositoryWrite { }

export interface ParticipantService {
    getAll(votingId: string): PromiseLike<Participant[]>
    create(participant: Participant): PromiseLike<Participant>
}