import React from 'react';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { Main } from './main/Main';

export default class Layout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 100
        };
        
    }

    componentDidMount() {
        setInterval(() => {
            const newState = this.state.counter + 1;
            this.setState({
                counter: newState
            });
        }, 1000)
    }

    render() {
        return (
            <div className="layout">
                <Header></Header>
                <Main count={this.state.counter}></Main>
                <Footer></Footer>
            </div>
        );
    }
}