import React from 'react'
import { SocketProviderContext } from './providers'
import { useSummonerIcon } from '../hooks/useSummonerIcon'
import { Button } from './buttons'
import { cn } from '../lib/utils'

interface QueuePopCardProps {
  p: { name: string, iconId: number, accepted: boolean }
}

const QueuePopCard = ({ p }: QueuePopCardProps) => {
  const { i } = useSummonerIcon(p.iconId)
  const { i: placeholder } = useSummonerIcon(29);

  return (
    <div className='flex flex-col items-center justify-center content-center'>
      <img className={cn("w-12 h-12 border border-league-button", p.accepted && "border border-green-500")} src={i.length > 1000 ? i : placeholder} alt='icon'/>
    </div>
  )
}


const QueuePop = () => {
  const { queuePop, socket } = React.useContext(SocketProviderContext)
  console.log('quarterpou:', queuePop)

  function handleAccept(){
    socket?.emit("accept")
  }
  function handleDecline(){
    socket?.emit("decline")
  }

  return (
    <> { queuePop && Object.keys(queuePop).length > 0 &&
      <div className={cn(
        "flex flex-col items-center justify-center content-center fixed inset-0",
        "w-full h-full bg-black bg-opacity-90 z-[1000]"
      )}>
          <div className='flex flex-col items-center justify-center content-center w-full max-w-xl '>
            <div className='font-beaufort-bold mt-6 mb-10 text-5xl'>Match Found</div>
            <div className='block bg-text h-1 mb-2 transition-all ease-linear duration-[1000ms]' style={{ width: `${queuePop.timer / 3 * 10}%` }} />

            <div className='flex items-center justify-center w-full gap-2'>
              {queuePop.players.map((p: { name: string, iconId: number, accepted: boolean }) =>
                <QueuePopCard p={p} />
              )}
            </div>

            <div className='flex items-center gap-2 mb-10 mt-10'>
              <Button onClick={() => handleAccept()}>Accept</Button>
              <Button onClick={() => handleDecline()}>Decline</Button>
            </div>
          </div>

      </div>
    }
    </>
  )
}

export default QueuePop