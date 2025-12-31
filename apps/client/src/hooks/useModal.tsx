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

  const modal = (Item: React.ReactNode) => {
    return createPortal(
      <Modal onClose={closeModal} item={Item} />,
      document.getElementById("modal")!
    );
  };

  return { isModalOpen, closeModal, openModal, modal };
};

export default useModal;
