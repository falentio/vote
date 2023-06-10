import { describe, it, expect } from 'vitest';
import { VotingRepositoryKV } from './repository_kv';
import { KVNamespace } from "@miniflare/kv";
import type { KVNamespace as CFKVNamespace } from '@cloudflare/workers-types';
import { MemoryStorage } from "@miniflare/storage-memory";
import { v4 } from 'uuid';
import { id } from '$lib/utils/id';
import { VotingSchema, type Voting } from '$lib/schema/voting';

describe('voting repository', () => {
    const kv = new KVNamespace(new MemoryStorage()) as unknown as CFKVNamespace
    const repositories = [
        ["kv", new VotingRepositoryKV(kv)],
    ] as const

    describe.each(repositories)("%s", (_, repo) => {
        const voting: Voting = VotingSchema.parse({
            id: id(),
            name: "fooo",
            description: "testing",
            secret: "",
            created: new Date(),
            participants: [],
        })
        it("create", async (ctx) => {
            await expect(repo.create(voting)).resolves.toEqual(undefined)
        })
        it("get", async () => {
            await expect(repo.get(voting.id)).resolves.not.toEqual(null)
        })
    })
});
