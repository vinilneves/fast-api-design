import axios from 'axios'

export default class RequestsService {
    async list() {
        return (await axios.get('http://localhost:3001/requests')).data
    }

    async save(requests) {

    }
}