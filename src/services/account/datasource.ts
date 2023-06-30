import Base from "../../Base.js";
import AccountRestService from "./service.js";
import { AccountCreationDto } from "./type.js";

class AccountDatasource extends Base {

    async RegisterUser(data: AccountCreationDto) {
        return await new AccountRestService().RegisterUser(data)
    }

    async GetUserProfile() {
        return await new AccountRestService().GetUserProfile()
    }

}

export default AccountDatasource