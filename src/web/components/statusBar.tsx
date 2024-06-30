import React from 'react'
import { AnimatePresence, motion, useIsPresent } from "framer-motion";

interface StatusBarProps {
    statusMessages?: string[]
}

interface ItemProps {
    children: any
}

const Item = ({ children }: ItemProps) => {
    const isPresent = useIsPresent();
    const animations = {
      style: {
        position: isPresent ? "static" as any : "absolute" as any
      },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { type: "spring", stiffness: 3000, damping: 100 }
    };
    return (
      <motion.h1 {...animations} layout className='text-sm'>
        {children}
      </motion.h1>
    );
  };
  

const StatusBar = ({ statusMessages }: StatusBarProps) => {
    console.log(statusMessages)

    return (
        <div className='relative h-full'>
            <AnimatePresence>
                {statusMessages?.slice(-3).map((statusMessage, index) => (
                    <Item key={statusMessage.split(";")[1]}>
                        {statusMessage.split(";")[0]}
                    </Item>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default StatusBar