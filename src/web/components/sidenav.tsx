import { Link } from "@tanstack/react-router";

const SideNav = () => {
  return (
    <div className="flex w-full gap-2 pl-[0.81rem] pt-[0.15rem] pb-1">
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
  );
};

export default SideNav;
