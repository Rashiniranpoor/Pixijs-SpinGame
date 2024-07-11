export function getRandom(max: number) {
    const result = Math.floor(Math.random() * max);
    return result;
}

export function getLimitedRandom(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
