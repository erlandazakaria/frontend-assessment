export const initialEmployeeState = [];
export const EmployeeReducer = [
    {
        case: 'ADD_ALL_EMPLOYEES',
        func: (state, action) => {
            return Object.assign({}, state, {
                employees: action.payload
            })
        }
    },
];
