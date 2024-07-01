import { cn } from '../lib/utils'

interface QueueMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
    playerName: string
}

const QueueMemberCard = ({ className, playerName }: QueueMemberCardProps) => {
  return (
    <div 
        className={cn(
            "p-[0.06rem] bg-gradient-to-br from-gray-500 to-text rounded-[0.375rem] shadow hover:bg-indigo-500 transition-all duration-1000", 
            className
        )}>
        <div className='w-full h-full bg-card px-3 rounded-[0.23rem]'>
            <span className='truncate text-gray-50 font-thin text-lg font-beaufort'>{playerName}</span>
        </div>
    </div>
  )
}

export default QueueMemberCard