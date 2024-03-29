'use client'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    useDisclosure,
    IconButton
  } from '@chakra-ui/react'
  import { useState } from 'react';
  import React from 'react';
  import { FiEdit } from 'react-icons/fi'

function UpdateTask({ task, updateTask }:any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState('');
    const initialRef:any= React.useRef()

    return (
        <>
            <IconButton
                icon={<FiEdit />}
                isRound={true}
                onClick={onOpen} aria-label={''}     />
          <Modal
            isCentered
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent w='90%'>
              <ModalHeader>Update task</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input ref={initialRef} placeholder='Enter your task' defaultValue={task.title} onChange={(e) => setTitle(e.target.value)} onFocus={(e) => setTitle(e.target.value)}/>
                </FormControl>
              </ModalBody>
    
              <ModalFooter>
                <Button mr={3} onClick={onClose}>Cancel</Button>
                <Button colorScheme='blue'  onClick={() => updateTask(task._id, title, onClose)}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UpdateTask;