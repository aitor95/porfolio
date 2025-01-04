import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const scaleAnimation = {
  initial: {scale: 0, x:"-50%", y:"-100%"},
  enter: {scale: 1, x:"-50%", y:"-100%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
  enterCursor: {scale: 1, x:"-50%", y:"-165%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
  closed: {scale: 0, x:"-50%", y:"-100%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

export default function Modal({modal}) {

  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect( () => {
    //Move Container
    let xMoveContainer = gsap.quickTo(modalContainer.current , "left", {duration: 0.8, ease: "power3"})
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
    let yMoveCursor = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
    //Move cursor label

    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})

    window.addEventListener('mousemove', (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX)
      yMoveContainer(pageY)
      xMoveCursor(pageX)
      yMoveCursor(pageY)
      xMoveCursorLabel(pageX)
      yMoveCursorLabel(pageY)
    })
  }, [])


  return (
    <>
      <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={modal ? "enter" : "closed"} className="h-auto w-[400px] aspect-video absolute overflow-hidden pointer-events-none flex items-center justify-center rounded-lg shadow-custom">
        <div className="h-full w-full flex items-center justify-center">
          <img src="/photography.webp" alt="demo" className='h-auto' />
        </div>
      </motion.div>
      <motion.div ref={cursor} className="size-20 rounded-full text-white  absolute z-10 flex items-center justify-center text-base font-light pointer-events-none bg-[#455CE9]" variants={scaleAnimation} initial="initial" animate={modal ? "enterCursor" : "closed"}></motion.div>
      <motion.div ref={cursorLabel} className="size-20 rounded-full text-white  absolute z-10 flex items-center justify-center text-base font-light pointer-events-none" variants={scaleAnimation} initial="initial" animate={modal ? "enterCursor" : "closed"}>Visitar</motion.div>
    </>
  )
}