import React, { Component } from 'react';

class Cell extends Component {
    render() {

        var columns = [];
        for (var i = 0; i < Meteor.settings.public.loopLength; i++) {
            columns.push(<td className='note' key={this.props.cell.id + '-' + i} data-row={this.props.cell.id} data-column={i}></td>);
        }

        return (
            <tr>
                <th>{this.props.cell.text}</th>
                {columns}
            </tr>

        );
    }
}

class App extends Component {
    getRows() {
        return [
            { id: 0,  text: 'C'  },
            { id: 1,  text: 'C#' },
            { id: 2,  text: 'D'  },
            { id: 3,  text: 'D#' },
            { id: 4,  text: 'E'  },
            { id: 5,  text: 'F'  },
            { id: 6,  text: 'F#' },
            { id: 7,  text: 'G'  },
            { id: 8,  text: 'G#' },
            { id: 9,  text: 'A'  },
            { id: 10, text: 'A#' },
            { id: 11, text: 'B'  },
        ];
    }

    componentDidMount() {
    }

    renderCells() {
        return this.getRows().map((cell) => (
            <Cell key={'row-' + cell.id} cell={cell} />
        ));
    }

    render() {
        return (
            <div className="container">
                <table className="notes">
                    <tbody>
                        {this.renderCells()}
                    </tbody>
                </table>
                <button id="btn-play">play/pause</button>
            </div>
        );
    }
}

module.exports.App = App;