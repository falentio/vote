import type { VotingCreate } from "$lib/schema/voting";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const votingToCreate = await request
            .formData()
            .then(d => ({
                options: d.getAll("options[]").filter(Boolean),
                ...Object.fromEntries(d)
            }) as VotingCreate)
        return locals.application.votingService.create(votingToCreate)
    }
}