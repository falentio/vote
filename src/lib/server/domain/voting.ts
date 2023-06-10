import type { Voting, VotingCreate } from "$lib/schema/voting"

export interface VotingRepositoryRead {
    get(id: string): PromiseLike<Voting | null>
}

export interface VotingRepositoryWrite {
    create(voting: Voting): PromiseLike<void>
    update(id: string, updateFn: (voting: Voting) => Voting): PromiseLike<void>
}

export interface VotingRepository extends VotingRepositoryRead, VotingRepositoryWrite { }

export interface VotingService {
    get(id: string): PromiseLike<Voting | null>
    update(id: string, updateFn: (voting: Voting) => Voting): PromiseLike<void>
    create(voting: VotingCreate): PromiseLike<Voting>
}