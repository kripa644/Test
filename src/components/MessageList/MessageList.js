import './MessageList.css';

const MessageList = ({selected, setSelected, messages}) => {
    return (
        <ul className="messageList">
                { messages.map((message) => {
                    const classNames = message === selected ? 'selectedTitle' : 'undefined';
                    return (
                        <li
                            className={classNames}
                            onClick={() => {
                                if (selected) selected.selected = false;
                                message.selected = true;
                                setSelected(message);
                            }}
                        >
                            <span key={message.id}>{message.title}</span>
                        </li>
                    );
                })}
        </ul>
    );
}

export default MessageList;