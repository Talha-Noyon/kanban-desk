import Modal from 'react-bootstrap/Modal';
import {Button, Form} from "react-bootstrap"
import PropTypes from 'prop-types';
import {useRef} from 'react';

const CreateTaskModal = ({addTaskModal, closeAddTaskModal}) => {
  const {item} = addTaskModal;
  const titleRef = useRef();
  const detailsRef = useRef();
    return (
        <Modal show={addTaskModal.active} onHide={closeAddTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>{item? "Edit Task": "Create Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={titleRef}
                type="text"
                defaultValue={item?.label}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Bit more</Form.Label>
              <Form.Control ref={detailsRef} as="textarea" rows={3} defaultValue={item?.details}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeAddTaskModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => closeAddTaskModal({item, columnId: addTaskModal.columnId, title: titleRef?.current?.value, details: detailsRef?.current?.value})}>
            {item? "Edit": "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default CreateTaskModal
CreateTaskModal.propTypes = {
  addTaskModal: PropTypes.object,
  closeAddTaskModal: PropTypes.func,
  columnId: PropTypes.node
};