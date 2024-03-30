import React from 'react'
import { SocketProviderContext } from './providers'
import { getProfileClashBannerUrl } from '../lib/utils'
import { Link } from '@tanstack/react-router'

const SideNav = () => {
  const { summoner } = React.useContext(SocketProviderContext)

  return (
    <div className="flex flex-col w-28 mt-3">
      <Link to="/" className="[&.active]:font-bold">
        Queue
      </Link>
      <Link to="/game" className="[&.active]:font-bold">
        Game
      </Link>
      <Link to="/profile" className="[&.active]:font-bold">
        Profile
      </Link>
      <Link to="/match-history" className="[&.active]:font-bold">
        Match History
      </Link>
    </div>
  )
}

export default SideNav