import { cn } from "../lib/utils";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

/** League button style by default */
export function Button({ children, className, type }: ButtonProps) {
  return (
    <button
      type={type || "button"}
      className={cn(
        className,
        `flex items-center content-center w-full justify-center bg-gradient-to-b from-league-border 
        to-league-borderdarker p-[.125rem] uppercase tracking-widest  
         first-letter:w-full hover:brightness-150 transition-all duration-150`,
      )}
    >
      <span className={cn("font-beaufort-bold",
      `flex w-full items-center justify-center content-center border-b border-x border-black
       px-4 py-2 bg-league-button text-league-text text-center`)}>
        {children}
      </span>
    </button>
  );
}
