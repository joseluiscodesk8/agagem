import postgres from "postgres";
import { promises as dns } from "node:dns";
import { isIP } from "node:net";

const connectionString = process.env.DATABASE_URL;
const poolOptions = { max: 5, idle_timeout: 20, connect_timeout: 10 };

let cached = null;
let addressPool = null;

async function resolveHost() {
  const url = new URL(connectionString);
  if (isIP(url.hostname)) return url.hostname;
  try {
    const addresses = await dns.resolve4(url.hostname, { ttl: false });
    if (addresses?.length) {
      addressPool ||= addresses;
      return addressPool[0];
    }
  } catch {
    // la resolución puede fallar de forma intermitente en redes locales
  }
  return null;
}

export async function getDb() {
  if (cached) return cached;

  const host = await resolveHost();
  if (host) {
    const url = new URL(connectionString);
    cached = postgres({
      host,
      port: Number(url.port) || 5432,
      database: url.pathname.replace(/^\//, "") || "postgres",
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      ssl: { rejectUnauthorized: false, servername: url.hostname },
      ...poolOptions,
    });
  } else {
    cached = postgres(connectionString, poolOptions);
  }

  return cached;
}

export function resetDb() {
  cached = null;
}

export async function withDbRetry(fn, attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      resetDb();
      await new Promise((resolve) => setTimeout(resolve, 700 * (i + 1)));
    }
  }
  throw lastError;
}