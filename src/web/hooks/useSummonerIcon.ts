import t from "@src/shared/config";

export function useSummonerIcon(iconId: number) {
  const { data: icon } = t.lol.getSummonerIcon.useQuery({ id: iconId });
  const i = `data:image/png;base64,${btoa(
    String.fromCharCode.apply(
      null,
      // @ts-ignore
      icon,
    ),
  )}`;
  return { i };
}
