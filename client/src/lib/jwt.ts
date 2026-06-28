// Tiny client-side helpers for inspecting JWTs. These do NOT verify the
// signature — verification only happens server-side. The client uses these
// purely for UX (e.g., "is my stored guest token still valid?"). Never trust
// a decoded payload for authorisation decisions.

interface JwtPayload {
    exp?: number;
    iat?: number;
    isGuest?: boolean;
    userId?: string;
    email?: string;
}

function base64UrlDecode(segment: string): string {
    const padded = segment.replace(/-/g, '+').replace(/_/g, '/');
    const padLen = (4 - (padded.length % 4)) % 4;
    return atob(padded + '='.repeat(padLen));
}

export function decodeJwtPayload(token: string): JwtPayload | null {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
        const json = base64UrlDecode(parts[1]);
        return JSON.parse(json) as JwtPayload;
    } catch {
        return null;
    }
}

export function isGuestTokenValid(token: string | null): boolean {
    if (!token) return false;
    const payload = decodeJwtPayload(token);
    if (!payload) return false;
    if (payload.isGuest !== true) return false;
    if (typeof payload.exp !== 'number') return false;
    // 30 s of skew so we don't reuse a token that's about to expire mid-call.
    return payload.exp * 1000 > Date.now() + 30_000;
}
