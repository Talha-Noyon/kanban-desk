import {createSlice} from '@reduxjs/toolkit';
import {getUniqueId} from '../../utils/utils';
let initialState = {
    columns: [
        {
            id: getUniqueId(),
            name: "To do",
            taskTitle: "ADD NEW TASK",
            taskTitleIcon: "⊕",
            items: [{
                    "key": getUniqueId(),
                    "label": "Design new UI presentation",
                    "details": "Dribble presentation",
                    "createdAt": Date.now()
                },
                {
                    "key": getUniqueId(),
                    "label": "Add more UI/UX mockups",
                    "details": "Dribble presentation",
                    "createdAt": Date.now()
                },
                {
                    "key": getUniqueId(),
                    "label": "Email Queue",
                    "details": "Dribble presentation",
                    "createdAt": Date.now()
                }]
        },
        {
            id: getUniqueId(),
            name: "In progress",
            taskTitle: "ADD NEW TASK",
            taskTitleIcon: "⊕",
            items: [{
                "key": getUniqueId(),
                "label": "Create a new wareframe",
                "details": "Dribble presentation",
                "createdAt": Date.now()
            }, {
                "key": getUniqueId(),
                "label": "Create a twit and promote",
                "details": "Dribble presentation",
                "createdAt": Date.now()
            }, {
                "key": getUniqueId(),
                "label": "Create a prototype and test",
                "details": "Dribble presentation",
                "createdAt": Date.now()
            }]
        },
        {
            id: getUniqueId(),
            taskTitle: "ADD NEW TASK",
            taskTitleIcon: "⊕",
            name: "Done",
            items: [{
                "key": getUniqueId(),
                "label": "Add product to market",
                "details": "Dribble presentation",
                "createdAt": Date.now()
            }, {
                "key": getUniqueId(),
                "label": "Run and manage campaign",
                "details": "Dribble presentation",
                "createdAt": Date.now()
            }, {
                "key": getUniqueId(),
                "label": "Lunch product promotion",
                "details": "Dribble presentation",
                "createdAt": Date.now()
            }]
        }]
}
let kanbanDataSlice = createSlice({
    name: 'kanbanData',
    initialState,
    reducers: {
        setKanbanData(state = initialState, action) {
            return {...state, columns: action.payload}
        }
    },
});

export const {setKanbanData} = kanbanDataSlice.actions;
export default kanbanDataSlice.reducer;