import React from 'react';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


/**
 * Table of treatments of a patient
 * 
 * @returns The list the treatments of a patient in a table form.
 */
const Treatment = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        {/* Treatment Modal Detail */}
        <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>Modal content</Modal.Body>
        </Modal.Content>
      </Modal.Root>

        {/* List Table */}
            <h1> Treatment </h1>
        </>
    )
}

export  default  Treatment;