import './ViewMessage.css';

import { useState } from 'react';
import MessageList from '../MessageList/MessageList';
import MessageDisplay from '../MessageDisplay/MessageDisplay';

const ViewMessage = ({ messages }) => {
    const selectedMessage = messages.find((message) => message.selected);
    const [selected, setSelected] = useState(selectedMessage);
    return (
        <div className={"ViewMessageContainer"}>
            {messages.length !== 0 && 
            <div>
                <MessageList messages={messages} selected={selected} setSelected={setSelected}/>
                <MessageDisplay message={selected}/>
            </div>}
            {messages.length === 0 && <h1>No messages</h1>}
        </div>
    );
};

export default ViewMessage;