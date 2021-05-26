import React, { Component } from 'react';
import ListItemsComponent from "./ListItemsComponents";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ItemComponent from "./ItemComponent";

class ItemApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>Items Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListItemsComponent} />
                        <Route path="/:id" component={ItemComponent} />
                    </Switch>
                </>
            </Router>
        );
    }
}

export default ItemApp