import React, {Component} from 'react';

export default class Books extends Component {

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Livros</h1>
                </div>
                <div className="content" id="content"></div>
            </div>
        )
    }
}