import { TEAM_TAG_NAMES_COLORS } from "../lib/constants";
import { cn } from "../lib/utils";

interface QueueMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  player: { name: string; duoTag: string };
}

const QueueMemberCard = ({ className, player }: QueueMemberCardProps) => {
  return (
    <div
      className={cn(
        "p-[0.06rem] bg-gradient-to-br from-gray-500 to-text rounded-[0.375rem] shadow hover:bg-indigo-500 transition-all duration-1000",
        className,
      )}
    >
      <div className="w-full h-full bg-card px-3 rounded-[0.23rem]">
        <span className="truncate text-gray-50 font-thin text-lg font-beaufort">
          {player.name}
          {player?.duoTag && (
            <span
              className={cn(
                "ml-1 font-beaufort text-sm",
                TEAM_TAG_NAMES_COLORS[player.duoTag.toLowerCase()],
              )}
            >
              [Duo {player.duoTag}]
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default QueueMemberCard;
