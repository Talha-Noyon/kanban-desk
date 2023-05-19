import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import DndContents from "./DndContents";
import PropTypes from 'prop-types';
const KanbanDesk = ({title, icon}) => {
    const {columns} = useSelector((state) => state.kanbanData);
    useEffect(() => {
        document.title = title
    }, [title]);

    const [displayLoading, setDisplayLoading] = useState(false);
    useEffect(() => {
        setDisplayLoading(true);
        setDisplayLoading(false);
    }, []);

    return (
        <>
            {
                displayLoading ?
                    <div className='d-flex justify-content-center'>
                        <img className='img-fluid' src="asstes/loader.gif" alt="loader" />
                    </div> :
                    Object.keys(columns).length > 0 && (
                        <>
                            <div className='align-items-center d-flex mb-3'>
                                <img className='img-fluid component-icon' src={icon} alt="icon" />
                                <h5 className='d-inline-block m-0 ml-3 ms-3'>{title}</h5>
                            </div>
                            <DndContents />
                        </>
                    )
            }
        </>
    )
}

export default KanbanDesk

KanbanDesk.propTypes = {
    title: PropTypes.node,
    icon: PropTypes.node
};