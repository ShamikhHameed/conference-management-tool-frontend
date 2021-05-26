import React, {Component} from "react";
import ItemDataService from "../service/ItemDataService";

class ListItemsComponents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tutorials: [],
            message: null
        }
        this.refreshItems = this.refreshItems.bind(this)
        this.updateItemClicked = this.updateItemClicked.bind(this)
        this.addItemClicked = this.addItemClicked.bind(this)
    }

    componentDidMount() {
        this.refreshItems();
    }

    refreshItems(){
        ItemDataService.retrieveAllItems()
            .then(
                response => {
                    console.log(response);
                    this.setState({tutorials: response.data})
                }
            )
    }

    deleteItemClicked(id) {
        ItemDataService.deleteItem(id)
            .then(
                response => {
                    this.setState({ message: `Delete of item ${id} Successful` })
                    this.refreshItems()
                }
            )

    }

    updateItemClicked(id) {
        this.props.history.push(`/${id}`)
    }

    addItemClicked() {
        this.props.history.push(`/-1`)
    }

    render() {
        return (
            <div className="container">
                <h3>All Items</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tutorials.map(
                                    tutorial =>
                                        <tr key={tutorial.id}>
                                            <td>{tutorial.id}</td>
                                            <td>{tutorial.title}</td>
                                            <td>{tutorial.description}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateItemClicked(tutorial.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteItemClicked(tutorial.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addItemClicked}>Add</button>
                </div>
            </div>
        )
    }
}

export default ListItemsComponents