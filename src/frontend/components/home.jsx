import React from 'react';
import ReactDOM from 'react-dom';

const Home = React.createClass({
    getInitialState() {
        return {
            rooms: [
                {id: 1, name:'room1'},
                {id: 2, name:'room21'}
            ]
        };
    },
    render() {
        let Rooms = this.state.rooms.map((room) => {
            return (<p key={room.id}>{room.name}</p>);
        });
        return (<div>
            <h2>Rooms:</h2>
            {Rooms}
        </div>);
    }
});

ReactDOM.render(<Home />, document.getElementById('app'));
