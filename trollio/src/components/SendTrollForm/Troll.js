import { mapping } from './gifs'

function Troll({ troll, key, isSelected, onClick }) {
    const style = {
        width: '150px',
        height: '115px',
        border: isSelected ? '2px solid green' : '',
    };

    return (
        <div key={key} style={style} onClick={() => onClick && onClick(troll)}>
            <img style={{ width: '100%', height: '100%' }} src={mapping[troll]} alt={troll} />
        </div>
    );
}

export default Troll;
