import React from 'react';
import TutorialDataService from '../services/TutorialService';
import { Link } from "react-router-dom";

export default class TutorialList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    onSearchTitleChange = (e) => {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveTutorials = () => {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    refreshList = () => {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveTutorial = (tutorial, index) => {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }

    removeAllTutorials = () => {
        TutorialDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            })
    }

    searchTutorialByTitle = () => {
        TutorialDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        const { searchTitle, tutorials, currentIndex, currentTutorial } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search By Title"
                            value={searchTitle}
                            onChange={this.onSearchTitleChange}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTutorialByTitle}
                            >
                                Serach
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List</h4>
                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={
                                        "list-group-item" +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={index}
                                >
                                    {tutorial.title}
                                </li>
                            ))}
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTutorials}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTutorial.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTutorial.published ? "Published" : "Pending"}
                            </div>
                            <Link
                                to={"/tutorials/" + currentTutorial.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
};