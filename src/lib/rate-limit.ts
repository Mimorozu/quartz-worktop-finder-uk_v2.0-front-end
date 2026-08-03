import "server-only";

type Bucket = { count: number; resetAt: number };

// In-memory sliding-window limiter — works per Node process, which is fine
// for a single-instance deployment. Would need a shared store (e.g. Redis)
// if this ever runs behind multiple instances/serverless functions.
const buckets = new Map<string, Bucket>();

setInterval(
  () => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key);
    }
  },
  5 * 60 * 1000
).unref();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}
