import React from "react";

export const useModal = (modelContentInit: JSX.Element | null = null) => {
  const [isShowing, setIsShowing] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<JSX.Element | null>(
    modelContentInit
  );

  const toggle = () => setIsShowing(!isShowing);

  return {
    isShowing,
    toggle,
    setModalContent,
    modalContent,
    setIsShowing,
  };
};
