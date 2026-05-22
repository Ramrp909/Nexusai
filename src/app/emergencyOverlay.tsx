import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  AlertTriangle,
} from "lucide-react";

import { useAI }
from "../context/AIContext";

export default function EmergencyOverlay() {

  const {
    showDangerAlert,
  } = useAI();

  return (

    <AnimatePresence>

      {showDangerAlert && (

        <motion.div
          className="
            fixed inset-0

            z-[100]

            flex
            items-center
            justify-center

            bg-red-500/10

            backdrop-blur-md
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >

          <motion.div
            className="
              bg-white/90
              dark:bg-[#161B22]/95

              rounded-[32px]

              p-8

              shadow-2xl

              border border-red-500/20

              max-w-md
              w-full

              mx-4
            "
            initial={{
              scale: 0.8,
              y: 40,
            }}
            animate={{
              scale: 1,
              y: 0,
            }}
            exit={{
              scale: 0.8,
              y: 40,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 220,
            }}
          >

            <div className="
              flex
              flex-col
              items-center
              text-center
            ">

              {/* Animated Alert Icon */}
              <motion.div
                className="
                  w-24 h-24

                  rounded-full

                  bg-red-500

                  flex
                  items-center
                  justify-center

                  mb-6

                  shadow-[0_0_40px_rgba(239,68,68,0.35)]
                "
                animate={{
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >

                <AlertTriangle
                  className="
                    w-12 h-12
                    text-white
                  "
                />

              </motion.div>

              {/* Title */}
              <h2 className="
                text-3xl
                font-bold

                text-red-500

                mb-3
              ">
                Drowsiness Detected
              </h2>

              {/* Description */}
              <p className="
                text-slate-600
                dark:text-slate-300

                mb-6
              ">
                Driver attention level critically low.
                Please stay alert or take a break immediately.
              </p>

              {/* Emergency Status */}
              <div className="
                w-full

                p-4

                rounded-2xl

                bg-red-500/10

                border border-red-500/10
              ">

                <p className="
                  text-red-500

                  font-medium
                ">
                  AI Emergency Safety Protocol Activated
                </p>

              </div>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}