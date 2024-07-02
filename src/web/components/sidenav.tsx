import { Link, useRouter } from "@tanstack/react-router";
import { cn } from "../lib/utils";

const SideNav = () => {
  const router = useRouter();
  const pathName = router?.latestLocation?.pathname;

  return (
    <div className="flex w-full gap-2 pl-[0.5rem] pt-[0.2rem] pb-[0.25rem]">
      <Link
        to="/"
        search={{ previousRoute: router.latestLocation.pathname }}
        className={cn(
          "border-border border rounded-md px-2 bg-card hover:underline",
          pathName === "/" ? "underline" : "",
        )}
      >
        Queue
      </Link>
      <Link
        to="/game"
        search={{ previousRoute: router.latestLocation.pathname }}
        className={cn(
          "border-border border rounded-md px-2 bg-card hover:underline",
          pathName === "/game" ? "underline" : "",
        )}
      >
        Game
      </Link>
      <Link
        to="/profile"
        search={{ previousRoute: router.latestLocation.pathname }}
        className={cn(
          "border-border border rounded-md px-2 bg-card hover:underline",
          pathName === "/profile" ? "underline" : "",
        )}
      >
        Profile
      </Link>
      <Link
        to="/match-history"
        search={{ previousRoute: router.latestLocation.pathname }}
        className={cn(
          "border-border border rounded-md px-2 bg-card hover:underline",
          pathName === "/match-history" ? "underline" : "",
        )}
      >
        Match History
      </Link>
    </div>
  );
};

export default SideNav;
