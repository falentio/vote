import type { Voting } from "$lib/schema/voting";
import type { VotingRepository } from "$lib/server/domain/voting";
import type { KVNamespace } from "@cloudflare/workers-types";

export class VotingRepositoryKV implements VotingRepository {
    constructor(
        private kv: KVNamespace,
        private ttl: number = -1
    ) { }

    create(voting: Voting) {
        return this.kv.put("voting:" + voting.id, JSON.stringify(voting), {
            expirationTtl: this.ttl > -1 ? this.ttl : undefined,
        })
    }

    async update(id: string, updateFn: (voting: Voting) => Voting) {
        const voting = await this.get(id)
        if (!voting) {
            return
        }
        const updated = updateFn(voting)
        return this.create(updated)
    }

    get(id: string) {
        return this.kv.get<Voting>("voting:" + id, "json")
    }
}