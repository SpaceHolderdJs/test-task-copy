import { FC, PropsWithChildren, memo, useEffect } from "react";
import Modal from "react-modal";

type Props = {
    isOpen: boolean;
    closeModal: () => void;
};

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        overflow: "none",
    },
};

export const Modals: FC<PropsWithChildren<Props>> = memo(
    ({ children, isOpen, closeModal }) => {
        useEffect(() => {
            Modal.setAppElement("body");
        }, []);

        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {children}
            </Modal>
        );
    }
);

Modals.displayName = "Modals";
