// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Application, ApplicationOptions } from "$lib/server/application";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			application: Application
		}
		// interface PageData {}
		interface Platform {
			env?: ApplicationOptions
		}
	}
}

export { };
