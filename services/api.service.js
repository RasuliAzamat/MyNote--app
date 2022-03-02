class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async postNote(note) {
        try {
            const response = await fetch(`${this.url}/notes.json`, {
                method: 'POST',
                body: JSON.stringify(note),
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async getNote() {
        try {
            const response = await fetch(`${this.url}/notes.json`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async getNoteById(id) {
        try {
            const response = await fetch(`${this.url}/notes/${id}.json`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const response = await fetch(`${this.url}/notes/${id}.json`, { method: 'delete' });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
}

export const apiService = new ApiService('https://mynote-dc727-default-rtdb.firebaseio.com');
