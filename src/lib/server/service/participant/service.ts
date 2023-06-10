import { ParticipantSchema, type Participant } from "$lib/schema/participant";
import type { ParticipantRepository, ParticipantService } from "$lib/server/domain/participant";

export class ParticipantServiceImpl implements ParticipantService {
    constructor(private repo: ParticipantRepository) { }

    getAll(votingId: string) {
        return this.repo.getAll(votingId)
    }

    async create(participant: Participant) {
        participant = ParticipantSchema.parse(participant)
        await this.repo.create(participant);
        return participant;
    }
}