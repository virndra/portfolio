import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const DEFAULT_AUDIO_PREVIEW = "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7e/13/22/7e1322c7-980d-160f-8c68-dc9b9863a559/mzaf_1440735671923738990.plus.aac.p.m4a";

async function getAccessToken() {
  if (!client_id || !client_secret || !refresh_token) {
    return null;
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  });

  return response.json();
}

export async function GET() {
  try {
    const tokenData = await getAccessToken();

    if (!tokenData || !tokenData.access_token) {
      return NextResponse.json({
        isPlaying: false,
        title: "Hall of Fame",
        artist: "The Script ft. will.i.am",
        album: "#3",
        albumImageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0244287246ea331e6f7b0ef8a9",
        songUrl: "https://open.spotify.com/track/0FB5ILDICqwK6xj7W1RP9u",
        trackId: "0FB5ILDICqwK6xj7W1RP9u",
        previewUrl: DEFAULT_AUDIO_PREVIEW,
      });
    }

    const { access_token } = tokenData;

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (recentRes.ok) {
        const recentData = await recentRes.json();
        const lastTrack = recentData.items?.[0]?.track;
        if (lastTrack) {
          const trackId = lastTrack.id || (lastTrack.external_urls?.spotify?.split("/track/")[1]?.split("?")[0]);
          return NextResponse.json({
            isPlaying: false,
            title: lastTrack.name,
            artist: lastTrack.artists.map((a: any) => a.name).join(", "),
            album: lastTrack.album.name,
            albumImageUrl: lastTrack.album.images[0]?.url,
            songUrl: lastTrack.external_urls.spotify,
            trackId: trackId,
            previewUrl: lastTrack.preview_url || DEFAULT_AUDIO_PREVIEW,
          });
        }
      }
    } else if (response.ok) {
      const song = await response.json();
      if (song.item) {
        const trackId = song.item.id || (song.item.external_urls?.spotify?.split("/track/")[1]?.split("?")[0]);
        return NextResponse.json({
          isPlaying: song.is_playing,
          title: song.item.name,
          artist: song.item.artists.map((a: any) => a.name).join(", "),
          album: song.item.album.name,
          albumImageUrl: song.item.album.images[0]?.url,
          songUrl: song.item.external_urls.spotify,
          trackId: trackId,
          previewUrl: song.item.preview_url || DEFAULT_AUDIO_PREVIEW,
        });
      }
    }
  } catch (err) {
    console.error("Spotify API error:", err);
  }

  return NextResponse.json({
    isPlaying: false,
    title: "Hall of Fame",
    artist: "The Script ft. will.i.am",
    album: "#3",
    albumImageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0244287246ea331e6f7b0ef8a9",
    songUrl: "https://open.spotify.com/track/0FB5ILDICqwK6xj7W1RP9u",
    trackId: "0FB5ILDICqwK6xj7W1RP9u",
    previewUrl: DEFAULT_AUDIO_PREVIEW,
  });
}
