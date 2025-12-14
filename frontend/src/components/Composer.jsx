import { useState } from 'react';

function Composer({ onSend, disabled }) {
    const [value, setValue] = useState('');

    function submit(e) {
        e.preventDefault();
        const text = value.trim();
        if (!text || disabled) return;
        onSend(text);
        setValue('');
    }

    return (
        <div className="composer">
            <form className="composerInner" onSubmit={submit}>
                <div className="inputPill">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Ask anything..."
                        disabled={disabled}
                    />
                </div>

                <button className="submitBtn" type="submit" disabled={disabled || !value.trim()}>
                    SUBMIT
                </button>
            </form>
        </div>
    );
}

export default Composer;
