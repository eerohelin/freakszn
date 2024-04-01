import type React from "react";
import { cn } from "../lib/utils";

interface TagProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
}

export function Tag({ children, className, ...props }: TagProps){
  return (
    <div
      {...props}
      className={cn("px-2", className)} 
    >
      {children}
    </div>
  )
}