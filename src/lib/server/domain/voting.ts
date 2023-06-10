import type { Voting, VotingCreate } from "$lib/schema/voting"

export interface VotingRepositoryRead {
    get(id: string): PromiseLike<Voting | null>
}

export interface VotingRepositoryWrite {
    create(voting: Voting): PromiseLike<void>
}

export interface VotingRepository extends VotingRepositoryRead, VotingRepositoryWrite { }

export interface VotingService {
    get(id: string): PromiseLike<Voting | null>
    create(voting: VotingCreate): PromiseLike<Voting>
}