"use client"

import { motion, useAnimation } from "framer-motion"
import { useInView            } from "react-intersection-observer"
import { useEffect            } from "react"

type FadeInProps = {
  children: React.ReactNode
  delay  ?: number
}

export const FadeInWhenVisible = ({ children, delay = 0 }: FadeInProps) => {
  const controls = useAnimation();

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView)
      controls.start("visible");
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{
        duration: 0.6, delay
      }}
      variants={{
        hidden : { opacity: 0, y: 30 },
        visible: { opacity: 1, y:  0 }
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadeInWhenVisible;
