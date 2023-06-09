import { NODE_ENV } from "$env/static/private"
import { Application } from "$lib/server/application"
import type { Handle } from "@sveltejs/kit"

export const handler: Handle = async ({ event, resolve }) => {
    if (NODE_ENV === "production") {
        if (!event.platform) {
            throw new Error("platform not set")
        }
        event.locals.application = new Application(event.platform)
    } else {
        const { MemoryStorage } = await import("@miniflare/storage-memory")
        const { KVNamespace } = await import("@miniflare/kv")
        event.locals.application = new Application({
        })
    }
    return resolve(event)
}