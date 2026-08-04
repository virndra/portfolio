import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

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
      // Fallback response if Spotify credentials are not yet set
      return NextResponse.json({
        isPlaying: false,
        title: "Hall of Fame",
        artist: "The Script",
        album: "#3",
        albumImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
        songUrl: "https://open.spotify.com/track/7CH1sfLfcA38mWRyR4KZjM",
      });
    }

    const { access_token } = tokenData;

    // Fetch currently playing
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      // Not playing anything currently -> fetch last played
      const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (recentRes.ok) {
        const recentData = await recentRes.json();
        const lastTrack = recentData.items?.[0]?.track;
        if (lastTrack) {
          return NextResponse.json({
            isPlaying: false,
            title: lastTrack.name,
            artist: lastTrack.artists.map((a: any) => a.name).join(", "),
            album: lastTrack.album.name,
            albumImageUrl: lastTrack.album.images[0]?.url,
            songUrl: lastTrack.external_urls.spotify,
          });
        }
      }
    } else if (response.ok) {
      const song = await response.json();
      if (song.item) {
        return NextResponse.json({
          isPlaying: song.is_playing,
          title: song.item.name,
          artist: song.item.artists.map((a: any) => a.name).join(", "),
          album: song.item.album.name,
          albumImageUrl: song.item.album.images[0]?.url,
          songUrl: song.item.external_urls.spotify,
        });
      }
    }
  } catch (err) {
    console.error("Spotify API error:", err);
  }

  // Fallback
  return NextResponse.json({
    isPlaying: false,
    title: "Hall of Fame",
    artist: "The Script",
    album: "#3",
    albumImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    songUrl: "https://open.spotify.com/track/7CH1sfLfcA38mWRyR4KZjM",
  });
}
