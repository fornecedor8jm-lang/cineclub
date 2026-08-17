import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Loader2, Pause, Play, Radio, RotateCw, Volume2, VolumeX, X } from "lucide-react";
import type { M3uChannel } from "@/lib/m3u";

type ChannelPlayerProps = {
  channel: M3uChannel;
  onClose: () => void;
};

export default function ChannelPlayer({ channel, onClose }: ChannelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDonation, setShowDonation] = useState(false);
  const [showChannelInfo, setShowChannelInfo] = useState(true);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowDonation(true);
      window.setTimeout(() => setShowDonation(false), 12000);
    }, 10 * 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setShowChannelInfo(true);
    const hideTimer = window.setTimeout(() => setShowChannelInfo(false), 5000);
    return () => window.clearTimeout(hideTimer);
  }, [channel.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsLoading(true);
    setError("");
    let hls: Hls | null = null;

    const startPlayback = () => {
      video.play()
        .then(() => { setIsLoading(false); setIsPlaying(true); })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play()
            .then(() => { setIsLoading(false); setIsPlaying(true); })
            .catch(() => setIsPlaying(false));
        });
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = channel.url;
      video.addEventListener("loadedmetadata", startPlayback, { once: true });
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 30 });
      hls.loadSource(channel.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, startPlayback);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hls?.startLoad();
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls?.recoverMediaError();
        } else {
          setError("Este canal não conseguiu iniciar agora. Tente outro canal.");
        }
      });
    } else {
      setError("Este navegador não oferece suporte a reprodução HLS.");
    }

    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => { setIsLoading(false); setIsPlaying(true); };
    const onError = () => setError("Não foi possível reproduzir este canal.");
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);

    return () => {
      hls?.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
    };
  }, [channel.url, retryKey]);

  const toggleOrientation = async () => {
    const nextLandscape = !isLandscape;
    const orientation = typeof screen !== "undefined" ? screen.orientation : undefined;
    const lockOrientation = orientation && (orientation as ScreenOrientation & { lock?: (value: "landscape" | "portrait") => Promise<void> }).lock;

    try {
      if (nextLandscape) {
        if (!document.fullscreenElement && playerRef.current?.requestFullscreen) {
          await playerRef.current.requestFullscreen();
        }
        if (lockOrientation) await lockOrientation.call(orientation, "landscape");
      } else {
        if (lockOrientation) await lockOrientation.call(orientation, "portrait");
        if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
      }
    } catch {
      // Alguns navegadores só permitem lock de orientação quando o site está instalado como PWA.
    }

    setIsLandscape(nextLandscape);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play().then(() => setIsPlaying(true)); }
    else { video.pause(); setIsPlaying(false); }
  };

  return (
    <div className="channel-player-layer" role="dialog" aria-modal="true" aria-label={`Reprodutor de ${channel.name}`}>
        <div ref={playerRef} className={`channel-player${isLandscape ? " is-landscape" : ""}`} onClick={() => setShowChannelInfo(false)}>

        <video ref={videoRef} playsInline autoPlay muted={isMuted} className="channel-video" />
        <div className="channel-player-scrim" />
        <div className="channel-player-topline">
          <span className="player-brand"><span className="brand-dot" /> cine<em>club</em></span>
          <div className="player-top-actions">
            <button type="button" className="player-rotate" onClick={toggleOrientation} aria-label={isLandscape ? "Voltar para retrato" : "Girar para paisagem"} title={isLandscape ? "Voltar para retrato" : "Girar para paisagem"}><RotateCw size={20} /></button>
            <button type="button" className="player-close" onClick={onClose} aria-label="Fechar reprodutor"><X size={22} /></button>
          </div>
        </div>
        <div className="channel-player-content">
          {isLoading && !error && <div className="player-loading"><Loader2 size={28} className="spin" /><span>Conectando ao canal...</span></div>}
          {error && <div className="player-error"><Radio size={27} /><strong>Transmissão indisponível</strong><span>{error}</span><div className="player-error-actions"><button type="button" className="button button-primary" onClick={() => { setError(""); setIsLoading(true); setRetryKey((value) => value + 1); }}>Tentar novamente</button><button type="button" className="button button-ghost" onClick={onClose}>Escolher outro canal</button></div></div>}
        </div>
        {showDonation && (
          <div className="player-donation" role="status" aria-live="polite">
            <strong>Tá gostando do app gratuito?</strong>
            <span>Doe para a gente qualquer valor. É só falar com a gente no grupo Caçadores Winchesters.</span>
          </div>
        )}
        <div className="channel-player-controls">
          <div className={`player-channel-info${showChannelInfo ? "" : " is-hidden"}`} onClick={() => setShowChannelInfo(false)}>

            {channel.logo ? <img className="player-channel-logo" src={channel.logo} alt="" /> : <span className="player-channel-fallback"><Radio size={18} /></span>}
            <div><span className="live-badge">AO VIVO</span><h2>{channel.name}</h2><p>{channel.group}</p></div>
          </div>
          <div className="player-actions">
            <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pausar" : "Reproduzir"}>{isPlaying ? <Pause size={19} /> : <Play size={19} fill="currentColor" />}</button>
            <button type="button" onClick={() => setIsMuted((muted) => !muted)} aria-label={isMuted ? "Ativar som" : "Silenciar"}>{isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
