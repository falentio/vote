import { error, type Actions, type Handle, fail } from "@sveltejs/kit";
import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load = (async ({ params, locals }: PageServerLoadEvent) => {
    const voting = await locals.application.votingService.get(params.id)
    if (!voting) {
        throw error(404)
    }
    voting.participants = await locals.application.participantService.getAll(voting.id)
    const points = {} as Record<string, number>
    if (voting.multi) {
        const pointsSet = {} as Record<string, Set<string>>
        voting.participants.forEach(p => {
            const s = pointsSet[p.votingId] ||= new Set()
            s.add(p.ip)
        })
        for (const k in pointsSet) {
            points[k] = (pointsSet[k]?.size || 0)
        }
    } else {

        voting.participants
            .filter((p, i, a) => a.lastIndexOf(p) === i)
            .forEach(p => {
                points[p.selected] ||= 0
                points[p.selected]++
            })
    }
    const max = Math.max(...Array.from(Object.values(points)), 1)
    return { voting, points, max }
}) satisfies PageServerLoad

export const actions: Actions = {
    default: async ({ getClientAddress, params, locals, request }) => {
        const form = await request.formData()
        const selected = form.get("selected")
        if (!params.id || !selected || typeof selected !== "string") {
            return fail(400, {
                message: "unknwon voting id"
            })
        }
        await locals.application.participantService.create({
            ip: getClientAddress(),
            votingId: params.id,
            selected,
        })
        return {}
    }
}