const vocal = "aiueo"
const consonant = "bcdfghjklmnpqrstvwxyz"

export function id(len = 6) {
    let result = ""
    for (let i = 0; i < len; i++) {
        const c = [consonant, vocal][i % 2]
        result += c[Math.random() * c.length | 0]
    }
    return result
}