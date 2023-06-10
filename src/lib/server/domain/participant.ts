import type { Participant } from "$lib/schema/participant"

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