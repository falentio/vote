import { VotingSchema, type Voting, type VotingRepository, type VotingService } from "../../domain/voting";

export class VotingServiceImpl implements VotingService {
    constructor(
        private votingRepo: VotingRepository
    ) { }

    get(id: string) {
        return this.votingRepo.get(id)
    }

    async create(voting: Voting) {
        voting = VotingSchema.parse({
            ...voting,
            secret: crypto.randomUUID()
        })
        await this.votingRepo.create(voting);
        return voting;
    }
}