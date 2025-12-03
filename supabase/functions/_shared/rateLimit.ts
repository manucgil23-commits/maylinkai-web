// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitConfig {
  maxRequests: number; // Maximum requests allowed
  windowMs: number; // Time window in milliseconds
}

export function rateLimit(
  identifier: string, // Usually IP address
  config: RateLimitConfig = { maxRequests: 60, windowMs: 60000 } // Default: 60 requests per minute
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean up old entries (simple cleanup)
  if (rateLimitStore.size > 10000) {
    const entries = Array.from(rateLimitStore.entries());
    entries.forEach(([key, value]) => {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    });
  }

  // If no record or window expired, create new window
  if (!record || record.resetTime < now) {
    const resetTime = now + config.windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: config.maxRequests - 1, resetTime };
  }

  // Check if limit exceeded
  if (record.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(identifier, record);
  return { allowed: true, remaining: config.maxRequests - record.count, resetTime: record.resetTime };
}

export function getRateLimitHeaders(remaining: number, resetTime: number) {
  return {
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(resetTime).toISOString(),
  };
}
