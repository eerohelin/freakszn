import { Link, useRouter } from "@tanstack/react-router";

const SideNav = () => {
  const router = useRouter()

  return (
    <div className="flex w-full gap-2 pl-[0.5rem] pt-[0.2rem] pb-[0.25rem]">
      <Link to="/" search={{ previousRoute: router.latestLocation.pathname }} className="border-border border rounded-md px-2 bg-card">
        Queue
      </Link> 
      <Link to="/game" search={{ previousRoute: router.latestLocation.pathname }} className="border-border border rounded-md px-2 bg-card">
        Game
      </Link>
      <Link to="/profile" search={{ previousRoute: router.latestLocation.pathname }} className="border-border border rounded-md px-2 bg-card">
        Profile
      </Link>
      <Link to="/match-history" search={{ previousRoute: router.latestLocation.pathname }}className="border-border border rounded-md px-2 bg-card">
        Match History
      </Link>
    </div>
  );
};

export default SideNav;
