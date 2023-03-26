import React from 'react';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


/**
 * Detail view of the treatment record
 * 
 * @returns Modal with the details of the treatment record.
 */
const TreatmentDetailModal = (props) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
         <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        {/* Modal content */}
      </Modal>
            <h1> Treatment </h1>
        </>
    )
}

export  default  TreatmentDetailModal;