import type { ParticipantService } from "../domain/participant"
import type { VotingService } from "../domain/voting"
import { ParticipantRepositoryKV } from "../service/participant/repository_kv"
import { ParticipantServiceImpl } from "../service/participant/service"
import { VotingRepositoryKV } from "../service/voting/repository_kv"
import { VotingServiceImpl } from "../service/voting/service"

export class Application {
    votingService: VotingService
    participantService: ParticipantService
    constructor(platform: App.Platform) {
        const votingRepo = new VotingRepositoryKV(platform.DATA)
        const participantRepo = new ParticipantRepositoryKV(platform.DATA)
        this.votingService = new VotingServiceImpl(votingRepo)
        this.participantService = new ParticipantServiceImpl(participantRepo)
    }
}