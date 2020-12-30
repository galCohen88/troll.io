import './Switch.css';

function Switch({ label, isChecked, onToggle, style }) {
    return (
        <div className="Switch__container" style={style}>
            <label className="switch">
                <input type="checkbox" onChange={() => {onToggle && onToggle(!isChecked)}}/>
                <span className="slider round"/>
            </label>
            <label className="Switch__label">{label}</label>
        </div>
    );
}

export default Switch;
