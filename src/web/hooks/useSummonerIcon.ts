import t from "@src/shared/config";

export function useSummonerIcon(iconId = 29) {
  const { data: icon } = t.lol.getSummonerIcon.useQuery({
    id: Number(iconId) || 29,
  });
  const i = `data:image/png;base64,${btoa(
    String.fromCharCode.apply(
      null,
      // @ts-ignore
      icon,
    ),
  )}`;
  return { i };
}
