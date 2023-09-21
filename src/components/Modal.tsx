import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

export type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};
export const Modal = ({ children, onClose }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <$Overlay>
      <$ModalContent ref={overlayRef}>
        <$CloseButton onClick={onClose} data-testid="close-button">
          <$CloseIcon>&times;</$CloseIcon>
        </$CloseButton>
        {children}
      </$ModalContent>
    </$Overlay>
  );
};
const $Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const $ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 100;
  min-width: 500px;
`;

const $CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px; // Updated property
  background-color: #ec3535aa;
  cursor: pointer;
  font-size: 16px;
  border: solid 1px black;
`;

const $CloseIcon = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  line-height: 20px;
  text-align: center;
  color: #000;
`;
