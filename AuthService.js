// AuthService.js
class AuthService {
    static USERS = [
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' }
    ];

    static authenticate(username, password) {
        return this.USERS.some(user => user.username === username && user.password === password);
    }

    static register(username, password) {
        if (this.USERS.some(user => user.username === username)) {
            return false; // Username already exists
        }
        this.USERS.push({ username, password });
        return true;
    }
}

export default AuthService;
