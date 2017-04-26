import React from 'react';
import {connect} from 'react-redux';

import {STATUS} from './dsm';

const Main = ({messages, error}) => {
    if (error) {
        return <div>Error!</div>;
    }

    if (messages) {
        return <List messages={messages}/>
    }

    return <div>Loading...</div>;
};

const List = ({messages}) => (
    <ul>
        { messages.map((message, index) => (
            <ListItem key={index}>{message.text}, {message.author}</ListItem>
        ))}
    </ul>
);


const ListItem = ({children}) => (
    <li>{children}</li>
);

const mapStateToProps = (state) => {
    const {list: { messages, error, loading } = {}} = state;

    return {
        messages,
        error,
        loading
    }
};

export const App = connect(mapStateToProps)(Main);

