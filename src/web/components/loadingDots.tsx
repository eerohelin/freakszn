import { cn } from "../lib/utils";

interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoadingDots = ({ className, ...props }: LoadingDotsProps) => {
  return (
    <div {...props} className={cn("loading-dots", className)}>
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
};

export default LoadingDots;
