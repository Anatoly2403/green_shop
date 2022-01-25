import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { useStore } from "../../store";
import classes from "./Modal.module.scss";

const modalsAnimation = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
};

const Modal: FC = () => {
  const { width, isOpened, component, onClose } = useStore("modalStore");
  return (
    <AnimatePresence>
      {isOpened && (
        <div className={classes.modalWrapper}>
          <motion.div
            className={classes.modal}
            style={{ width }}
            {...modalsAnimation}
          >
            <div className={classes.modal__closeBtn} onClick={onClose} />
            <div className={classes.modal__content}>{component}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default observer(Modal);
