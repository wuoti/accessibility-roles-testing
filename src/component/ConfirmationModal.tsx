import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: VoidFunction
  onConfirm: VoidFunction
  children?: ReactNode
}

const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onClose,
  children,
}: ConfirmationModalProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove this item?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onConfirm}>
            Yes
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal
