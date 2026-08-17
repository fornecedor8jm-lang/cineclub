const premiumUrl = () => process.env.PREMIUM_M3U_URL?.trim();

export async function fetchPremiumPlaylist() {
  const url = premiumUrl();
  if (!url) throw new Error("PREMIUM_M3U_URL não configurada");

  const response = await fetch(url, {
    headers: { Accept: "audio/x-mpegurl,text/plain,*/*" },
    signal: AbortSignal.timeout(90_000),
  });
  if (!response.ok) throw new Error(`A fonte Premium respondeu HTTP ${response.status}`);
  return response.text();
}

export function hasPremiumSource() {
  return Boolean(premiumUrl());
}
