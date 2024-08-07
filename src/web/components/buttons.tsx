import { cn } from "../lib/utils";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

/** League button style by default */
export function Button({ children, className, type, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={cn(
        `flex items-center content-center w-full justify-center bg-gradient-to-b from-league-border 
        to-league-borderdarker p-[.125rem] uppercase tracking-widest text-league-text 
        first-letter:w-full hover:brightness-[175%] transition-all duration-150`,
        className,
      )}
    >
      <span
        className={cn(
          "font-beaufort-bold",
          `flex w-full items-center justify-center content-center border-b border-x border-black
            px-4 py-2 bg-league-button text-center`,
        )}
      >
        {children}
      </span>
    </button>
  );
}

export function Button2({ children, className, type, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={cn(
        `flex items-center content-center w-full justify-center bg-gradient-to-b from-league-border2 
        to-league-borderdarker2 p-[.125rem] uppercase tracking-widest text-league-text2 
        first-letter:w-full hover:brightness-[175%] transition-all duration-150`,
        className,
      )}
    >
      <span
        className={cn(
          "font-beaufort-bold",
          `flex w-full items-center justify-center content-center border-b border-x border-black
            px-4 py-2 bg-league-button text-center`,
        )}
      >
        {children}
      </span>
    </button>
  );
}

export function ButtonFszn({
  children,
  className,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={cn(
        "border-border border rounded-md px-2 bg-card hover:underline",
        className,
      )}
    >
      {children}
    </button>
  );
}
