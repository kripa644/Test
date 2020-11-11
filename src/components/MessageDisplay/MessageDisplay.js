import './MessageDisplay.css';

const MessageDisplay = ({message}) => {
    return (
        <div>
            {message && (
                <div className={"message-display"}>
                    <h2>{message.title}</h2>
                    <p>{message.detail}</p>
                </div>
            )}

            {!message && <p> No message is selected for display</p>}
        </div>
    );
}

export default MessageDisplay;