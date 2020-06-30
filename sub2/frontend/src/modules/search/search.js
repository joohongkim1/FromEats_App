import { searchService } from '../api/search'


// action types
export const actions = {
    SET_STORE_LIST_PENDING: 'SET_STORE_LIST_PENDING',
    SET_STORE_LIST_SUCCESS: 'SET_STORE_LIST_SUCCESS',
    SET_STORE_LIST_ERROR: 'SET_STORE_LIST_ERROR'
}

// actions
function setStorePending(isStorePending) {
    return {
        type: actions.SET_Store_LIST_PENDING,
        isStorePending
    };
}

function setStoreSuccess(isStoreSuccess, storeList) {
    return {
        type: actions.SET_STORE_LIST_SUCCESS,
        isStoreSuccess,
        storeList
    };
}

function setStoreError(isStoreError) {
    return {
        type: actions.SET_STORE_LIST_ERROR,
        isStoreError
    }
}

export function getStoreListByCategory(category) {
    return async (dispatch) => {
        dispatch(setStorePending(true));

        dispatch(setStoreError("not yet"));


        await searchService.getStoreByCategory(category).then(
            (response) => {
                dispatch(setStorePending(false));


                let stores = response;

                dispatch(setStoreSuccess(true, stores));

            },
            error => {
                dispatch(setStorePending(false));
                dispatch(setStoreError("getWineListByType error"));
            }
        );
    }
}


const initialState = {
    storeList: [],
    isStorePending: false,
    isStoreSucceess: false,
    isStoreError: ''
}

// Reducer
export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STORE_LIST_PENDING:
            return {
                ...state,
                isStorePending: action.isStorePending
            }

        case actions.SET_STORE_LIST_SUCCESS:
            return {
                ...state,
                isStoreSucceess: action.isStoreSucceess,
                storeList: action.storeList
            }

        case actions.SET_STORE_LIST_ERROR:
            return {
                ...state,
                isStoreError: action.isStoreError
            }
        default:
            return state;
    }
}
