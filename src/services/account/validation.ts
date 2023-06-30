import { InferType, object, string } from "yup"
import { ErrorHandlers } from "../../helpers/ErrorHandlers.js";



const AccountRegSchema = object().shape({
    firstName: string().required(),
    email: string().email().required(),
    lastName: string().required(),
    phone: string().required(),
})


export type IAccountRegistration = InferType<typeof AccountRegSchema>


export class AccountValidation {
    registerUser(regData: IAccountRegistration) {
        return new Promise((resolve, reject) => {
            AccountRegSchema.validate(regData, { abortEarly: true }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(new ErrorHandlers().ValidationError(err));
            });
        });
    }
}
