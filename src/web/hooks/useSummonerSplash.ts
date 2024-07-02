import t from "@src/shared/config";

export function useSummonerSplash(backgroundId = 1000) {
  const { data: splash } = t.lol.getSummonerSplash.useQuery({
    id: Number(backgroundId) || 1000,
  });

  function arrayBufferToBase64(buffer: any) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const i = `data:image/jpg;base64,${arrayBufferToBase64(splash)}`;

  return { i };
}
