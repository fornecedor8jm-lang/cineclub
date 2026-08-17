import { fetchPremiumPlaylist, hasPremiumSource } from "../server/premiumSource";

type VercelRequest = { method?: string };
type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (name: string, value: string) => VercelResponse;
  send: (body: string) => void;
  json: (body: unknown) => void;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });
  if (!hasPremiumSource()) return res.status(503).json({ error: "Fonte Premium ainda não configurada" });

  try {
    const playlist = await fetchPremiumPlaylist();
    res.setHeader("Cache-Control", "private, max-age=300");
    res.setHeader("Content-Type", "audio/x-mpegurl; charset=utf-8");
    return res.status(200).send(playlist);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível carregar a fonte Premium";
    return res.status(502).json({ error: message });
  }
}
