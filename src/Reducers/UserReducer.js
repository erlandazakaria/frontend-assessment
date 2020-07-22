export const initialUserState = {};
export const UserReducer = [
    {
        case: 'LOGIN_USER',
        func: (state, action) => {
            return Object.assign({}, state, {
                user: action.payload
            })
        }
    },
    {
        case: 'LOGOUT_USER',
        func: (state) => {
            return Object.assign({}, state, {
                user: initialUserState
            })
        }
    },
];
