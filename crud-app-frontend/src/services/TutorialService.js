import http from '../axios';

class TutorialDataService {
    getAll() {
        return http.get("/tutorials");
    }

    get(id) {
        return http.get(`/tutorials/${id}`);
    }

    create(data) {
        console.log(data);
        return http.post("/tutorials", data, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
};

export default new TutorialDataService();