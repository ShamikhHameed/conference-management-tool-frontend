import React, {Component} from "react";
import ItemDataService from "../service/ItemDataService";
import { Formik, Form, Field, ErrorMessage } from 'formik';

class ItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            description: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if (this.state.id == -1) {
            return
        }

        ItemDataService.retrieveItem(this.state.id)
            .then(response => this.setState({
                title: response.data.title,
                description: response.data.description
            }))
    }

    onSubmit(values){
        let tutorial = {
            id: this.state.id,
            title: values.title,
            description: values.description
        }

        if(this.state.id == -1){
            ItemDataService.createItem(this.state.id, tutorial)
                .then(() => this.props.history.push('/'))
        } else {
          ItemDataService.updateItem(this.state.id, tutorial)
              .then(() => this.props.history.push('/'))
        }

        console.log(values);
    }

    validate(values) {
        let errors = {}
        if (!values.title) {
            errors.title = 'Enter a Title'
        }
        if (!values.description) {
            errors.description = 'Enter a Description'
        }

        return errors
    }

    render() {
        let { description, title, id } = this.state

        return (
            <div>
                <h3>Item</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, title, description }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="title" component="div"
                                                  className="alert alert-warning" />
                                    <ErrorMessage name="description" component="div"
                                                  className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field className="form-control" type="text" name="title" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default ItemComponent