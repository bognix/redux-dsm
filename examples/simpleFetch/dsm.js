import dsm from 'redux-dsm';

export const STATUS = {
    FETCHING: 'fetching',
    IDLE: 'idle',
    SUCCESS: 'success',
    ERROR: 'error'
};

export const myReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'List::FETCH_COMMITS::FETCH':
            return Object.assign({}, state, { loading: true});
        case 'List::FETCH_COMMITS::HANDLE_SUCCESS':
            return Object.assign({}, state, { messages: payload.messages});
        case 'List::FETCH_COMMITS::HANDLE_ERROR':
            return Object.assign({}, state, { error: true} );
        default:
            return state;
    }
};

const fetchingStates = [
    ['initialize', STATUS.IDLE,
        ['fetch', STATUS.FETCHING,
            ['cancel', STATUS.IDLE],
            ['report error', STATUS.ERROR,
                ['handle error', STATUS.IDLE]
            ],
            ['report success', STATUS.SUCCESS,
                ['handle success', STATUS.IDLE]
            ]
        ]
    ]
];

export const listDSM = dsm({
    component: 'List',
    description: 'Fetch Commits',
    actionStates: fetchingStates,
    customReducer: myReducer
});

export const actionCreators = listDSM.actionCreators;

export const reducer = listDSM.reducer;
