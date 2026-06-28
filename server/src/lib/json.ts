export function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
    if (value === null || value === undefined || value === '') return fallback;
    try {
        return JSON.parse(value) as T;
    } catch (err) {
        console.error('safeJsonParse: malformed JSON in stored field:', (err as Error).message);
        return fallback;
    }
}
