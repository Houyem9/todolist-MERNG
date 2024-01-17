'use client'

import { useMutation } from '@apollo/client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
  IconButton,
  ModalBody
} from '@chakra-ui/react'
import React from 'react';
import { FiTrash2 } from 'react-icons/fi'



function DeleteAllTask({ deleteTaskAll }:any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
      <>
          <Button
              colorScheme='gray'
              px='8'
              h='45'
              color='gray.500'
              mt='8'
              onClick={onOpen}
              >
              Delete All
          </Button>

          <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w='90%'>
              <ModalHeader>
              Do you really want to delete all tasks?              </ModalHeader>
              <ModalFooter>
              <Button mr={3} onClick={onClose}>No</Button>
              <Button colorScheme='blue' onClick={() => deleteTaskAll()}>
                  Yes
              </Button>
              </ModalFooter>
          </ModalContent>
          </Modal>
      </>
  )
}

function DeleteTask({ task, deleteTask}:any) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        icon={<FiTrash2 />}
        isRound={true}
        onClick={onOpen} aria-label={''}      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w='90%'>
          <ModalHeader>
          Do you really want to delete the task?
          </ModalHeader>
          <ModalBody>
              <Text>{task.title}</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>No</Button>
            <Button colorScheme='blue' onClick={() => deleteTask(task._id, onClose)}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { DeleteTask, DeleteAllTask }