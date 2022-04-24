import React from "react";
import { Button, Modal, Transition } from "semantic-ui-react";

interface DownloadModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    modalContent: React.ReactNode;
    title: string;
    closable?: boolean;
    setProgressPercent?: React.Dispatch<React.SetStateAction<number>>;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
    open,
    setOpen,
    title,
    modalContent,
    closable,
    setProgressPercent,
}) => {
    return (
        <Transition visible={open} animation="fade" duration={500}>
            <Modal
                onClose={
                    closable
                        ? () => {
                              setOpen(false);
                              setProgressPercent && setProgressPercent(0);
                          }
                        : undefined
                }
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>
                    <i
                        className="icon download"
                        style={{
                            marginRight: "0.75rem",
                        }}
                    ></i>
                    <span className="fs-20">{title}</span>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>{modalContent}</Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content={!closable ? "Please be patient!" : "Done!!"}
                        labelPosition="right"
                        icon={!closable ? "spinner" : "check"}
                        onClick={() => setOpen(false)}
                        positive={closable}
                        disabled={!closable}
                    />
                </Modal.Actions>
            </Modal>
        </Transition>
    );
};

export default DownloadModal;
