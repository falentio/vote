import { building } from "$app/environment"
import { NODE_ENV } from "$env/static/private"
import { Application } from "$lib/server/application"
import type { KVNamespace as CFKVNamespace } from "@cloudflare/workers-types"
import type { Handle } from "@sveltejs/kit"

let application: Application | null = null

export const handle: Handle = async ({ event, resolve }) => {
    if (building) {
        return resolve(event)
    }
    if (NODE_ENV === "production") {
        if (!event.platform?.env) {
            throw new Error("platform not set")
        }
        application ||= new Application(event.platform.env)
    } else {
        const { FileStorage } = await import("@miniflare/storage-file")
        const { KVNamespace } = await import("@miniflare/kv")
        const storage = new FileStorage("./data")
        application ||= new Application({
            DATA: new KVNamespace(storage) as unknown as CFKVNamespace
        })
    }
    event.locals.application = application
    return resolve(event)
}