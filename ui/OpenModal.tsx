import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface OpenModalProps {
  children: React.ReactNode;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

const OpenModal = forwardRef<ModalHandle, OpenModalProps>(function OpenModal(
  { children },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialog.current) {
        dialog.current.showModal();
        setIsOpen(true);
      }
    },
    close: () => {
      if (dialog.current) {
        dialog.current.close();
        setIsOpen(false);
      }
    },
  }));

  function onClickOutsideHandler(event: React.MouseEvent) {
    if (event.target === dialog.current) {
      dialog.current.close();
      setIsOpen(false);
    }
  }

  return (
    <dialog
      className={`${isOpen ? "dialog-open" : "dialog-close"}`}
      onClick={onClickOutsideHandler}
      ref={dialog}
    >
      {children}
    </dialog>
  );
});
export default OpenModal;
