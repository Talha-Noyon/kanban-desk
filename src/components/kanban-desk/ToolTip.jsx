import {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

const ToolTip = ({tooltipModal, editTask, delTask}) => {
    let {active, currentTarget} = tooltipModal
    const [show, setShow] = useState(active);
    const [target, setTarget] = useState(currentTarget);
    useEffect(() => {
        setTarget(currentTarget)
    }, [currentTarget])
    
    useEffect(() => {
        setShow(active)
    }, [active])

    const ref = useRef(null);
    return (
        <div ref={ref}>
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Body className='border-bottom text-center' onClick={() => {editTask(); setShow(!active)}}>
                        <strong>Edit</strong>
                    </Popover.Body>
                    <Popover.Body onClick={() => {delTask(); setShow(!active)}}>
                        <strong>Delete</strong>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}
export default ToolTip

ToolTip.propTypes = {
    tooltipModal: PropTypes.node,
    editTask: PropTypes.func,
    delTask: PropTypes.func
};