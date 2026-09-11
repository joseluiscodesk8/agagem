import postgres from "postgres";
import { promises as dns } from "node:dns";
import { isIP } from "node:net";

const poolOptions = { max: 5, idle_timeout: 20, connect_timeout: 10 };

export async function connect(connectionString) {
  const url = new URL(connectionString);

  if (!isIP(url.hostname)) {
    try {
      const addresses = await dns.resolve4(url.hostname, { ttl: false });
      if (addresses?.length) {
        return postgres({
          host: addresses[0],
          port: Number(url.port) || 5432,
          database: url.pathname.replace(/^\//, "") || "postgres",
          user: decodeURIComponent(url.username),
          password: decodeURIComponent(url.password),
          ssl: { rejectUnauthorized: false, servername: url.hostname },
          ...poolOptions,
        });
      }
    } catch {
      // se intenta de nuevo con la URL original
    }
  }

  return postgres(connectionString, poolOptions);
}