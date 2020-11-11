import './App.css';

import NavBar from '../NavBar/NavBar';
import SendMessage from '../SendMessage/SendMessage';
import ViewMessage from '../ViewMessage/ViewMessage';
import { useState } from 'react';

//Source https://gist.github.com/gordonbrander/2230317
var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const useMessages = () => {
    const [messages, setMessages] = useState([]);

    function addMessage(title, detail) {
        const message = {};
        message.title = title;
        message.detail = detail;
        message.id = ID();
        message.read = false;
        message.selected = false;
        setMessages([message].concat(messages));
    }

    function deleteMessage(messageId) {
        const restOfMessages = messages.filter((message) => messageId !== message.id);
        setMessages(restOfMessages);
    }

    return [messages, addMessage, deleteMessage];
};

function App() {
    const [selected, setSelected] = useState(0);
    const [messages, addMessage, deleteMessage] = useMessages();

    const submitMessage = (title, detail) => {
        addMessage(title, detail);
    };

    return (
        <div>
            <div className="App">
                <NavBar setSelected={setSelected} selected={selected}/>
            </div>
            <div className="sectionContainer">
                {selected === 0 ? <SendMessage submitMessage={submitMessage} /> : <ViewMessage messages={messages} />}
            </div>
        </div>
    );
}

export default App;