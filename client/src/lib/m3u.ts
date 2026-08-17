export const DEFAULT_M3U_URL = "https://iptv-org.github.io/iptv/languages/por.m3u";

export type M3uChannel = {
  id: string;
  name: string;
  group: string;
  logo?: string;
  country?: string;
  language?: string;
  url: string;
};

function readAttribute(line: string, names: string[]) {
  for (const name of names) {
    const match = line.match(new RegExp(`(?:^|[\\s,])${name}\\s*=\\s*["']([^"']*)["']`, "i"));
    if (match?.[1]) return match[1].trim();
  }
  return "";
}

function cleanName(value: string) {
  return value.replace(/^\\s*,\\s*/, "").replace(/\\s+/g, " ").trim();
}

function firstCommaOutsideQuotes(line: string) {
  let quote = "";
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if ((char === '"' || char === "'") && (!index || line[index - 1] !== "\\\\")) quote = quote === char ? "" : quote || char;
    if (char === "," && !quote) return index;
  }
  return -1;
}

export function parseM3u(text: string): M3uChannel[] {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);
  const channels: M3uChannel[] = [];
  let pending: Omit<M3uChannel, "url" | "id"> | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.toUpperCase().startsWith("#EXTINF")) {
      const comma = firstCommaOutsideQuotes(line);
      const fallbackName = comma >= 0 ? cleanName(line.slice(comma + 1)) : "Canal Cineclub";
      pending = {
        name: readAttribute(line, ["tvg-name", "name"]) || fallbackName,
        group: readAttribute(line, ["group-title", "group", "category"]) || "Canais ao vivo",
        logo: readAttribute(line, ["tvg-logo", "logo", "logo-url"]) || undefined,
        country: readAttribute(line, ["tvg-country", "country"]) || undefined,
        language: readAttribute(line, ["tvg-language", "language"]) || undefined,
      };
      continue;
    }

    if (!line.startsWith("#") && pending) {
      const url = line;
      const id = `${pending.name}-${url}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      channels.push({ ...pending, id, url });
      pending = null;
    }
  }

  const seen = new Set<string>();
  return channels.filter((channel) => {
    if (seen.has(channel.url)) return false;
    seen.add(channel.url);
    return true;
  });
}

export async function loadM3u(url = DEFAULT_M3U_URL) {
  const response = await fetch(url, { headers: { Accept: "audio/x-mpegurl,text/plain,*/*" } });
  if (!response.ok) throw new Error(`A lista respondeu HTTP ${response.status}`);
  const text = await response.text();
  const channels = parseM3u(text);
  if (!channels.length) throw new Error("A lista foi baixada, mas nenhum canal foi encontrado.");
  return channels;
}
