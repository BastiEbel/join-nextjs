import { ModalHandle } from "@/ui/OpenModal";

export function openModal(modalRef: React.RefObject<ModalHandle>) {
  if (modalRef.current) {
    return modalRef.current.open();
  }
}

export function closeModal(modalRef: React.RefObject<ModalHandle>) {
  if (modalRef.current) {
    return modalRef.current.close();
  }
}
