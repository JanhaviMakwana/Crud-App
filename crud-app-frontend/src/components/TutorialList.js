import React from 'react';
import { withRouter } from 'react-router';
import TutorialDataService from '../services/TutorialService';

class TutorialList extends React.Component {

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
        console.log("TutorialList");
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

    editTutorial = (id) => {
        this.props.history.push(`/tutorials/${id}`);
    }

    render() {
        const { searchTitle, tutorials, currentIndex, currentTutorial } = this.state;
        return (
            <div className="list">
                <div className="col-md-12" >
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
                                className="btn btn-secondary"
                                type="button"
                                onClick={this.searchTutorialByTitle}
                            >
                                Serach
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row row centered" >
                    <div className="col-md-6 p-3">
                        <h4>Tutorials List</h4>
                        <ul className="list-group">
                            {tutorials &&
                                tutorials.map((tutorial, index) => (
                                    <li
                                        className={
                                            "list-group-item list-group-item-dark list-group-item-action" +
                                            (index === currentIndex ? " active" : "")
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
                    <div className="col-md-6 mt-4">
                        {currentTutorial ? (
                            <div className="card p-4">
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
                                <button className="btn btn-primary btn-block"
                                    onClick={() => this.editTutorial(currentTutorial.id)}
                                >
                                    Edit
                            </button>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p>Please click on a Tutorial...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter(TutorialList);