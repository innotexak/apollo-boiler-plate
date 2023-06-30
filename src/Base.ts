import crypto from 'crypto';
import GeneralController from "./helpers/generalController.js";
import { Document, FilterQuery, Model } from "mongoose";
import MongooseErrorUtils from "./helpers/mongoErrorHandling.js";
import axiosInstance from "./helpers/axiosInstance.js";
import jwt from 'jsonwebtoken'
import { ErrorHandlers } from './helpers/ErrorHandlers.js';






interface ApiKeys {
    publicKey: string;
    secretKey: string;
    testPublicKey: string;
    testSecretKey: string;
}



export default class Base extends GeneralController {

    public errorMessage = "Invalid response, something went wrong!"
    constructor() {
        super();
    }
    async handleMongoError(mongo: Promise<Document>): Promise<Document> {
        return new Promise((resolve, reject) => {
            mongo.then((data) => resolve(data))
                .catch((reason) => {
                    reject(MongooseErrorUtils.handleMongooseError(reason));
                });
        });
    }

    marketPlaceAPI(token?: string,) {
        if (token) {
            axiosInstance.defaults.headers.common = {
                Authorization: `Bearer ${token}`,

            }
        } else {
            delete axiosInstance.defaults.headers.common.Authorization
        }


        return axiosInstance
    }




    async uniqueTokenGenerator<T extends Document>(model: Model<T>, name: string = 'code'): Promise<string> {
        let unique = false;
        let code: string = '';
        while (!unique) {
            code = crypto.randomBytes(16).toString('hex');
            const existingUsers = await model.findOne({ [name]: code } as FilterQuery<T>);
            if (!existingUsers) {
                unique = true;
            }
        }
        return code;
    }

}
