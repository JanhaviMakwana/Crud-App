import React from 'react';
import TutorialDataService from '../services/TutorialService';

export default class AddTutorial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: "",
            description: "  ",
            submitted: false
        }
    }

    componentDidMount() {
        console.log("Add Tutorial");
    }

    onChangeTitle = (e) => {
        this.setState({ title: e.target.value });
    }

    onChangeDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    saveTutorial = () => {
        const data = {
            title: this.state.title,
            description: this.state.description
        };
        ///console.log("click");
        TutorialDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTutorial = () => {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form card p-4" >
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully !</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Add Tutorial
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <p className="h5">Title</p>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>
                        <div className="form-group">
                            <p className="h5">Description</p>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <button onClick={this.saveTutorial} className="btn btn-success">
                            <p className="h5">Submit</p>
                        </button>
                    </div>
                )}
            </div>
        )
    }
};