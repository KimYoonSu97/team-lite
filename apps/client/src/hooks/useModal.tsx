import React, { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../components/Modal";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const modal = (
    type: "modal" | "alert" | "sideModal",
    Item: React.ReactNode,
  ) => {
    return createPortal(
      <Modal onClose={closeModal} item={Item} type={type} />,
      document.getElementById("modal")!,
    );
  };

  return { isModalOpen, closeModal, openModal, modal };
};

export default useModal;
