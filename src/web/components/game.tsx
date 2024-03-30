import { cn } from "../lib/utils"

interface GameProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  game: any
}

const Game = ({ className, game, ...props }: GameProps) => {
  return (
    <div className={cn(className, "")} {...props}>
      Game
    </div>
  )
}

export default Game