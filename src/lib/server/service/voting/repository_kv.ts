import type { Voting, VotingRepository } from "$lib/server/domain/voting";
import type { KVNamespace } from "@cloudflare/workers-types";

export class VotingRepositoryKV implements VotingRepository {
    constructor(
        private kv: KVNamespace,
        private ttl: number = -1
    ) { }

    create(voting: Voting) {
        return this.kv.put("voting:" + voting.id, JSON.stringify(voting), {
            expirationTtl: this.ttl > -1 ? this.ttl : undefined
        })
    }

    get(id: string) {
        return this.kv.get<Voting>("voting:" + id, "json")
    }
}