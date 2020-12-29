import React from 'react';


class Dashboard extends React.Component {
    renderScoreRow(score) {
        return <tr>
            <td>{score.user}</td>
            <td>{score.sent}</td>
            <td>{score.received}</td>
        </tr>
    }

    render() {
        const rows = this.props.scores.map( this.renderScoreRow );
        console.log(rows);
        return (
            <table id='scores'>
                <tr>
                    <th> </th>
                    <th>Sent</th>
                    <th>Received</th>
                </tr>
                {rows}
            </table>
        );
    }
}

export default Dashboard;
