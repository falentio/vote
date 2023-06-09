import type { Participant, ParticipantRepository } from "$lib/server/domain/participant";
import type { KVNamespace } from "@cloudflare/workers-types";

export class ParticipantRepositoryKV implements ParticipantRepository {
    constructor(private kv: KVNamespace) { }

    async getAll(votingId: string): Promise<Participant[]> {
        const { keys } = await this.kv.list({
            prefix: `participant:${votingId}:`,
        })
        const promises = keys.map((k) => {
            return this.kv.get<Participant>(k.name, "json")
        })
        return Promise
            .all(promises)
            .then(r => r.filter(Boolean) as Participant[])
    }

    create(participant: Participant): PromiseLike<void> {
        return this.kv.put(
            `participant:${participant.votingId}:${participant.ip}`,
            JSON.stringify(participant)
        )
    }
}