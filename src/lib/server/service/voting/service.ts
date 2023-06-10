import { VotingSchema, type VotingCreate, type Voting } from "$lib/schema/voting";
import type { VotingRepository, VotingService } from "../../domain/voting";

export class VotingServiceImpl implements VotingService {
    constructor(
        private votingRepo: VotingRepository
    ) { }

    get(id: string) {
        return this.votingRepo.get(id)
    }

    update(id: string, updateFn: (voting: Voting) => Voting) {
        return this.votingRepo.update(id, updateFn)
    }

    async create(votingToCreate: VotingCreate) {
        const voting = VotingSchema.parse(votingToCreate)
        await this.votingRepo.create(voting);
        return voting;
    }
}