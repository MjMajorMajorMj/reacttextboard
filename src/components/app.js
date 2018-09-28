import React from 'react';
import Thread from './thread';
import Board from './board';
import { Route } from 'react-router-dom';

const App = () => (
    <div>
        <h1 className="container text-center titleText">React Textboard</h1>
        <Route exact path='/' component={Board}></Route>
        <Route
            path="/test"
            render={(props) => <Thread {...props} threadID='testthread' />}
        />
    </div>
    //<Thread threadID='testthread' />
);

export default App;
