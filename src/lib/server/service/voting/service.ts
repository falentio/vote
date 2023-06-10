import { VotingSchema, type VotingCreate } from "$lib/schema/voting";
import type { VotingRepository, VotingService } from "../../domain/voting";

export class VotingServiceImpl implements VotingService {
    constructor(
        private votingRepo: VotingRepository
    ) { }

    get(id: string) {
        return this.votingRepo.get(id)
    }

    async create(votingToCreate: VotingCreate) {
        const voting = VotingSchema.parse(votingToCreate)
        await this.votingRepo.create(voting);
        return voting;
    }
}