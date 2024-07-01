import { useSummonerIcon } from "../hooks/useSummonerIcon";
import { cn } from "../lib/utils";
interface UserCard extends React.HTMLAttributes<HTMLDivElement> {
    user: { name: string; iconId: string | number };
    status?: string
    roundedIcon?: boolean
    iconStyles?: string,
    statusStyles?: string,  
  }

export function UserCard({ user, status = 'online', roundedIcon = true, iconStyles, statusStyles, className, ...props }: UserCard) {
    const { i } = useSummonerIcon(Number(user.iconId));
    const { i: placeholder } = useSummonerIcon(29);
  
    return (
      <div {...props} className={cn("flex gap-2 items-center hover:bg-white/10 py-2 cursor-pointer", className)}>
        <div className="flex items-center">
          <div className={cn(
            "bg-gradient-to-b from-league-border to-league-borderdarker p-[0.125rem]", 
            roundedIcon ? "rounded-full" : "rounded-none", 
            iconStyles
        )}>
            <img
              className={cn("w-10", roundedIcon ? "rounded-full" : "rounded-none")}
              src={i.length > 1000 ? i : placeholder}
              alt="avatar"
            />
          </div>
        </div>
        <div>
          <p className="text-[#9f9a8b]">{user.name}</p>
          <div className={cn("text-[#029f3f] text-sm -mt-[0.25rem]", statusStyles)}>
            {status}
          </div>
        </div>
      </div>
    );
  }