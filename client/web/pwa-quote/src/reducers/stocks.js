import ACTION_ENUM from './action';

const stock = (state = [], action) => {
    if (action.type) {
        switch (action.type) {
            case ACTION_ENUM.ADD_STOCK:
                return [
                    ...state,
                    {
                        name: action.name ? action.name.toUpperCase() : "-",
                        manualUpdate: false,
                    }
                ]
            case ACTION_ENUM.DELETE_STOCK:
                return state.filter(i => {
                    if (i.name !== action.name) { return i; }
                });
            case ACTION_ENUM.REFRESH_STOCK:
                return state.map(i => {
                    i.manualUpdate = new Date();
                    return i;
                });
            default:
                return state;
        }
    } else {
        return state;
    }
}

export default stock;

