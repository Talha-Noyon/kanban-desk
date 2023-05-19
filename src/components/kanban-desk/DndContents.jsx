import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {setKanbanData} from "../../store/reducers/kanbanData";
import moment from 'moment';
import {ContentBox, ContentEdit, CreateTask} from "../../styles/styled-component/kanban-desk";
import {useState} from "react";
import CreateTaskModal from "./CreateTaskModal.jsx";
import {getUniqueId} from "../../utils/utils";

const DndContents = () => {
    const dispatch = useDispatch();
    const {columns} = useSelector((state) => state.kanbanData);
    const [addTaskModal, setAddTaskModal] = useState({active: false});
    const formatPosition = (data) => {
        let cpColumns = JSON.parse(JSON.stringify(columns))
        for (const index in cpColumns) {
            let column = cpColumns[index]
            column.items = data[index].items
        }
        console.log("cpColumns");
        console.log(cpColumns);
        dispatch(setKanbanData(cpColumns));
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const {source, destination} = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            let tempColumns = {
                ...columns,
                [source.droppableId]: {
                    items: sourceItems
                },
                [destination.droppableId]: {
                    items: destItems
                }
            }
            formatPosition(tempColumns);
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            let tempColumns = {
                ...columns,
                [source.droppableId]: {
                    items: copiedItems
                }
            }
            formatPosition(tempColumns);
        }
    }

    const getStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        const {moveTo, curve, duration} = snapshot.dropAnimation;
        // move to the right spot
        const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;

        // patching the existing style
        return {
            ...style,
            transform: `${translate}`,
            // slowing down the drop because we can
            transition: `all ${curve} ${duration + 1}s`,
        };
    }

    const addNewTask = (columnId) => {
        setAddTaskModal((prev) => {return {...prev, columnId, active: !prev.active}})
    }
    const addTaskByColumn = ({columnId, title, details}) => {
        let cpColumns = JSON.parse(JSON.stringify(columns))
        for (const index in cpColumns) {
            let column = cpColumns[index]
            if (columnId === index) {
                column.items.push({
                    "key": getUniqueId(),
                    "label": title,
                    "details": details,
                    "createdAt": Date.now()
                })
            }
        }
        console.log("cpColumns");
        console.log(cpColumns);
        dispatch(setKanbanData(cpColumns));
    }
    const closeAddTaskModal = (data) => {
        if (data) {
            let {columnId, title, details} = data
            if (title.length > 0 && details.length > 0) {
                addTaskByColumn({columnId, title, details})
            }
        }
        setAddTaskModal((prev) => {return {...prev, active: false}})
    }
    return (
        <div className="mx-0 px-0 row border border-dark rounded">
            <DragDropContext onDragEnd={result => onDragEnd(result)}>
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            className={`col-md-4 col-12 my-3`}
                            key={`${columnId} ${index}`}
                        >
                            <div className="m-2">
                                <div className="border-dark card flex-row justify-content-between p-2 rounded shadow-sm">
                                    <h6 className="d-inline-block m-0 p-1">{column.name}</h6>
                                    <CreateTask className="d-inline-block m-0 p-1" onClick={() => {addNewTask(columnId)}}>
                                        {column.taskTitleIcon} {column.taskTitle}
                                    </CreateTask>
                                </div>
                                <Droppable droppableId={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    borderRadius: snapshot.isDraggingOver ? "5px" : "none",
                                                    border: snapshot.isDraggingOver ? "2px dashed lightskyblue" : "none",
                                                    minHeight: 400
                                                }}
                                            >
                                                {column?.items?.length > 0 &&
                                                    column?.items?.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item?.key}
                                                                draggableId={item?.key}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={getStyle(provided.draggableProps.style, snapshot)}
                                                                            className="card mt-3"
                                                                        >
                                                                            <ContentBox
                                                                                className={`p-2`}
                                                                            // onMouseEnter={() => {console.log({key: item.key, status: item.data.status})}}
                                                                            >
                                                                                <div className="d-flex justify-content-between">
                                                                                    <h6 className="d-inline-block m-0">{item.label}</h6>
                                                                                    <ContentEdit className="align-items-center card d-flex p-1">. . .</ContentEdit>
                                                                                </div>
                                                                                <p className="text-secondary small">{item.details}</p>
                                                                                <small className="alert alert-warning badge m-0 p-2">{moment(item.createdAt).format('DD MMM YYYY')}</small>
                                                                            </ContentBox>
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })
                                                }
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
            <CreateTaskModal addTaskModal={addTaskModal} closeAddTaskModal={closeAddTaskModal} />
        </div>
    );
}

export default DndContents;
