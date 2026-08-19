import { motion, useReducedMotion } from 'framer-motion'

/**
 * Fades content up as it scrolls into view.
 * Wrap anything: <Reveal><h2>Title</h2></Reveal>
 * If the visitor has reduced motion enabled, children render with no animation.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
