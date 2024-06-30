import React from 'react'
import { motion } from "framer-motion";

interface StatusBarProps {
    statusMessages?: string[]
}

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const StatusBar = ({ statusMessages }: StatusBarProps) => {
    return (
    <>
        {statusMessages 
        ?   
            <div className='relative flex items-center justify-center h-full'>
                <ul className='relative h-10 w-full'>
                    {statusMessages?.map((m, index) => 
                        <motion.li
                            layoutId={m}
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={m+index} 
                            className="font-beaufort text-xs text-indigo-300 border border-border px-[0.1rem] py-[0.05rem] mx-2 truncate"
                            animate={{
                                top: index * -CARD_OFFSET,
                                scale: 1 - index * SCALE_FACTOR,
                                zIndex: statusMessages.length - index
                              }}
                        >
                            {m}{index < 2 ? "" : ""}
                        </motion.li>
                    )}
                </ul>
            </div>
        :   <p className="font-beaufort">Waiting</p>
        }
    </>
    )
}

export default StatusBar