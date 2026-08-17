const premiumUrl = () => process.env.PREMIUM_M3U_URL?.trim();

function getValidatedPremiumUrl() {
  const rawUrl = premiumUrl();
  if (!rawUrl) throw new Error("PREMIUM_M3U_URL não configurada");

  try {
    const parsed = new URL(rawUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("protocolo não suportado");
    return parsed.toString();
  } catch {
    throw new Error("PREMIUM_M3U_URL inválida");
  }
}

export async function fetchPremiumPlaylist() {
  const url = getValidatedPremiumUrl();

  const response = await fetch(url, {
    headers: { Accept: "audio/x-mpegurl,text/plain,*/*" },
    signal: AbortSignal.timeout(90_000),
  });
  if (!response.ok) throw new Error(`A fonte Premium respondeu HTTP ${response.status}`);
  return response.text();
}

export function hasPremiumSource() {
  try {
    getValidatedPremiumUrl();
    return true;
  } catch {
    return false;
  }
}
