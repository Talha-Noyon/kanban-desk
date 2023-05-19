import Modal from 'react-bootstrap/Modal';
import {Button, Form} from "react-bootstrap"
import PropTypes from 'prop-types';
import {useRef} from 'react';

const CreateTaskModal = ({addTaskModal, closeAddTaskModal}) => {
  const titleRef = useRef();
  const detailsRef = useRef();
    return (
        <Modal show={addTaskModal.active} onHide={closeAddTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={titleRef}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Bit more</Form.Label>
              <Form.Control ref={detailsRef} as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeAddTaskModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => closeAddTaskModal({columnId: addTaskModal.columnId, title: titleRef?.current?.value, details: detailsRef?.current?.value})}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default CreateTaskModal
CreateTaskModal.propTypes = {
  addTaskModal: PropTypes.Boolean,
  closeAddTaskModal: PropTypes.node,
  columnId: PropTypes.node
};