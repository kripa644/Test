import './SendMessage.css';
import {useState} from 'react';

const MessageSent = ({ messageSentCallback }) => {
    return (
        <div>
            <p>Message sent successfully</p>
            <button className={"ok-button"} onClick={messageSentCallback}>OK</button>
        </div>
    );
};

const SendMessage = ({submitMessage}) => {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [hideInputs, setHideInputs] = useState(false);

    return (
        <div className={"container"}>
            {!hideInputs && (
                <form
                    onSubmit={(event) => {
                        console.log('on submit');
                        submitMessage(title, detail);
                        setTitle('');
                        setDetail('');
                        setHideInputs(true);
                        event.preventDefault();
                    }}
                    className="SendMessage"
                >
                    <div>
                        <label htmlFor="title">
                            Title{' '}
                            <input
                                className="SM-Input"
                                id="title"
                                placeholder="Enter a title"
                                onChange={(event) => setTitle(event.target.value)}
                                value={title}
                            ></input>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="details">
                            Details{' '}
                            <textarea
                            className="SM-Textarea"
                                id="details"
                                placeholder="Details here"
                                rows={8}
                                onChange={(event) => setDetail(event.target.value)}
                                value={detail}
                            ></textarea>{' '}
                        </label>
                    </div>

                    <input type="submit" value="Send" />
                </form>
            )}

            {hideInputs && <MessageSent messageSentCallback={() => setHideInputs(false)} />}
        </div>
    );
}

export default SendMessage;