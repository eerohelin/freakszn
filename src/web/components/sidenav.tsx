import { Link } from "@tanstack/react-router";

const SideNav = () => {
  return (
    <div className="flex flex-col w-44 border-r border-border pl-3 pt-2 h-full">
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
