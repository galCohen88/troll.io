import React from 'react';
import './dashboard.css'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.renderScoreRow = this.renderScoreRow.bind(this);
    }

    renderScoreRow(score, index) {
        let trClass = 'not-top-three';
        if (0 <= index && index <= 2) {
            trClass = 'top-three'
        }
        if (score.email === this.props.currentUser) {
            trClass += ' current-user';
        }

        let name = score.name;
        if (index === 0) {
            name += ' (1st)';
        } else if (index === 1) {
            name += ' (2nd)';
        } else if (index === 2) {
            name += ' (3rd)';
        }

        const image = require(`../users/${score.email}.jpeg`).default;

        return <tr className={trClass}>
            <td className="photo">
                <img className="user-image" src={image} alt={score.name} />
            </td>
            <td className="name">{name}</td>
            <td className="sent">{score.sent}</td>
            <td className="received">{score.received}</td>
        </tr>
    }

    render() {
        const rows = this.props.scores.map( this.renderScoreRow );

        return (
            <table id='scores'>
                <thead>
                    <tr>
                        <th> </th>
                        <th> </th>
                        <th>Sent</th>
                        <th>Received</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default Dashboard;
