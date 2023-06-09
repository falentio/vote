// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Application } from "$lib/server/application";
import type { KVNamespace } from "@cloudflare/workers-types";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			application: Application
		}
		// interface PageData {}
		interface Platform {
			DATA: KVNamespace
		}
	}
}

export { };
