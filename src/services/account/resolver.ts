import { AccountCreationDto } from "./type.js"
import AccountDatasource from "./datasource.js"
import { AccountValidation } from "./validation.js"
import { Request, Response } from "express"

export const AccountMutation = {
    async RegisterUser(_: unknown, { data }: { data: AccountCreationDto }) {
        await new AccountValidation().registerUser(data)
        return await new AccountDatasource().RegisterUser(data)
    }
}


export const AccountQuery = {
    async GetUserProfile(_: unknown, __: unknown, context: { req: Request, res: Response }) {
        return await new AccountDatasource().GetUserProfile()
    }
}