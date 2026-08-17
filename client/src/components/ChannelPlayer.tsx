import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { ChevronDown, ChevronUp, Loader2, Pause, Play, Radio, Volume2, VolumeX } from "lucide-react";
import type { M3uChannel } from "@/lib/m3u";

type ChannelPlayerProps = {
  channel: M3uChannel;
  channels?: M3uChannel[];
  onSelectChannel?: (channel: M3uChannel) => void;
  onClose: () => void;
};

export default function ChannelPlayer({ channel, channels = [], onSelectChannel, onClose }: ChannelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDonation, setShowDonation] = useState(false);
  const [showChannelInfo, setShowChannelInfo] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const channelInfoTimerRef = useRef<number | undefined>(undefined);
  const controlsTimerRef = useRef<number | undefined>(undefined);
  const fullscreenRequestedRef = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowDonation(true);
      window.setTimeout(() => setShowDonation(false), 12000);
    }, 10 * 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    window.clearTimeout(channelInfoTimerRef.current);
    window.clearTimeout(controlsTimerRef.current);
    setShowChannelInfo(false);
    setShowControls(false);
    return () => {
      window.clearTimeout(channelInfoTimerRef.current);
      window.clearTimeout(controlsTimerRef.current);
    };
  }, [channel.id]);

  useEffect(() => {
    const focusTimer = window.setTimeout(() => playerRef.current?.focus({ preventScroll: true }), 0);
    return () => window.clearTimeout(focusTimer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsLoading(true);
    setError("");
    let hls: Hls | null = null;
    let retryTimer: number | undefined;
    let stallTimer: number | undefined;
    let fatalRetries = 0;

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

    const looksLikeHls = /\.m3u8(?:$|[?#])|[?&](?:type|output)=m3u/i.test(channel.url);
    const looksLikeNativeVideo = /\.(?:mp4|webm|ogg)(?:$|[?#])/i.test(channel.url) || channel.contentType !== "live";
    if (video.canPlayType("application/vnd.apple.mpegurl") && looksLikeHls) {
      video.src = channel.url;
      video.addEventListener("loadedmetadata", startPlayback, { once: true });
    } else if (looksLikeNativeVideo) {
      video.src = channel.url;
      video.addEventListener("loadedmetadata", startPlayback, { once: true });
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 15,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 6,
        manifestLoadingMaxRetry: 4,
        levelLoadingMaxRetry: 5,
        fragLoadingMaxRetry: 6,
        manifestLoadingRetryDelay: 1000,
        levelLoadingRetryDelay: 1000,
        fragLoadingRetryDelay: 1000,
      });
      hls.loadSource(channel.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, startPlayback);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        fatalRetries += 1;
        if (fatalRetries <= 3 && data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          window.clearTimeout(retryTimer);
          retryTimer = window.setTimeout(() => hls?.startLoad(-1), 1000 * fatalRetries);
        } else if (fatalRetries <= 2 && data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls?.recoverMediaError();
        } else {
          setIsLoading(false);
          setError("A transmissão ficou indisponível. Tente novamente sem sair do player.");
        }
      });
    } else {
      setError("Este navegador não oferece suporte a reprodução HLS.");
    }

    const onWaiting = () => {
      setIsLoading(true);
      window.clearTimeout(stallTimer);
      stallTimer = window.setTimeout(() => {
        if (video.paused || video.readyState < 3) {
          setIsLoading(false);
          setError("A transmissão está demorando para responder. Tente novamente.");
        }
      }, 15000);
    };
    const onPlaying = () => {
      window.clearTimeout(stallTimer);
      setIsLoading(false);
      setError("");
      setIsPlaying(true);
      fatalRetries = 0;
    };
    const onError = () => {
      window.clearTimeout(stallTimer);
      setIsLoading(false);
      setError("Não foi possível reproduzir este canal.");
    };
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);

    return () => {
      window.clearTimeout(retryTimer);
      window.clearTimeout(stallTimer);
      hls?.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
    };
  }, [channel.url, retryKey]);

  const channelIndex = channels.findIndex((item) => item.id === channel.id);
  const previousChannel = channelIndex > 0 ? channels[channelIndex - 1] : undefined;
  const nextChannel = channelIndex >= 0 && channelIndex < channels.length - 1 ? channels[channelIndex + 1] : undefined;
  const selectChannel = (nextChannel: M3uChannel | undefined) => {
    if (nextChannel && onSelectChannel) onSelectChannel(nextChannel);
  };

  const requestNativeFullscreen = () => {
    const player = playerRef.current;
    if (!player || document.fullscreenElement === player || fullscreenRequestedRef.current) return;
    fullscreenRequestedRef.current = true;
    if (player.requestFullscreen) {
      void player.requestFullscreen().catch(() => { fullscreenRequestedRef.current = false; });
      return;
    }
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    video?.webkitEnterFullscreen?.();
  };

  const revealPlayerUi = () => {
    requestNativeFullscreen();
    setShowControls(true);
    setShowChannelInfo(true);
    window.clearTimeout(controlsTimerRef.current);
    window.clearTimeout(channelInfoTimerRef.current);
    controlsTimerRef.current = window.setTimeout(() => setShowControls(false), 5000);
    channelInfoTimerRef.current = window.setTimeout(() => setShowChannelInfo(false), 5000);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play().then(() => setIsPlaying(true)); }
    else { video.pause(); setIsPlaying(false); }
  };

  return (
    <div className="channel-player-layer" role="dialog" aria-modal="true" aria-label={`Reprodutor de ${channel.name}`}>
        <div ref={playerRef} tabIndex={0} className={`channel-player${showControls ? " is-ui-visible" : ""}`} onPointerDown={revealPlayerUi} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") revealPlayerUi(); if (event.key === "Escape") onClose(); }}>

        <video ref={videoRef} playsInline autoPlay muted={isMuted} className="channel-video" />
        <div className="channel-player-scrim" />
        <div className={`channel-player-topline${showControls ? " is-visible" : ""}`} aria-hidden="true">
          <span className="player-brand"><span className="brand-dot" /> cine<em>club</em></span>
        </div>
        <div className="channel-player-content">
          {isLoading && !error && <div className="player-loading"><Loader2 size={28} className="spin" /><span>{channel.contentType === "live" ? "Conectando ao canal..." : "Abrindo conteúdo Premium..."}</span></div>}
          {error && <div className="player-error"><Radio size={27} /><strong>Transmissão indisponível</strong><span>{error}</span><div className="player-error-actions"><button type="button" className="button button-primary" onClick={() => { setError(""); setIsLoading(true); setRetryKey((value) => value + 1); }}>Tentar novamente</button><button type="button" className="button button-ghost" onClick={onClose}>Escolher outro canal</button></div></div>}
        </div>
        {showDonation && (
          <div className="player-donation" role="status" aria-live="polite">
            <strong>Tá gostando do app gratuito?</strong>
            <span>Doe para a gente qualquer valor. É só falar com a gente no grupo Caçadores Winchesters.</span>
          </div>
        )}
        <div className={`channel-player-controls${showControls ? " is-visible" : ""}`}>
          <div className={`player-channel-info${showChannelInfo ? "" : " is-hidden"}`} aria-hidden={!showChannelInfo} data-channel-info={showChannelInfo ? "visible" : "hidden"} style={{ display: showChannelInfo ? "flex" : "none" }} onClick={() => setShowChannelInfo(false)}>

            {channel.logo ? <img className="player-channel-logo" src={channel.logo} alt="" /> : <span className="player-channel-fallback"><Radio size={18} /></span>}
            <div><span className="live-badge">{channel.contentType === "live" ? "AO VIVO" : "Nuvem Premium"}</span><h2>{channel.name}</h2><p>{channel.group}</p></div>
          </div>
          <div className="player-actions">
            <button type="button" className="player-channel-prev" onClick={() => selectChannel(previousChannel)} disabled={!previousChannel} aria-label="Canal anterior" title="Canal anterior"><ChevronUp size={19} /></button>
            <button type="button" className="player-channel-next" onClick={() => selectChannel(nextChannel)} disabled={!nextChannel} aria-label="Próximo canal" title="Próximo canal"><ChevronDown size={19} /></button>
            <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pausar" : "Reproduzir"}>{isPlaying ? <Pause size={19} /> : <Play size={19} fill="currentColor" />}</button>
            <button type="button" onClick={() => setIsMuted((muted) => !muted)} aria-label={isMuted ? "Ativar som" : "Silenciar"}>{isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
