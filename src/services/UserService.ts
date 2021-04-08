import {User} from "../models/User";
import {db} from "../db/pool";

class UserService {
    async addUser(user: User): Promise<number> {
        // " + "'" + user.values().join("','") + "'" + "
        return await db.query("insert into users(email, password, name, avatar_url, gender, age_range, role) values (" + "'" + user.values().join("','") + "'" + ") returning id;");
    }
}

export const userService = new UserService()