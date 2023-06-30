import Base from "../../Base.js";
import { ErrorHandlers } from "../../helpers/ErrorHandlers.js";
import { AccountCreationDto } from "./type.js";

class AccountRestService extends Base {

    async RegisterUser(data: AccountCreationDto) {
        const response = await this.marketPlaceAPI().post('/register', data)
        return response.data
    }

    async GetUserProfile() {
        const response = await this.marketPlaceAPI().get('/posts')
        return response.data
    }

}

export default AccountRestService