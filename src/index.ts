import {
    Context,
    createConnector,
    readConfig,
    Response,
    logger,
    StdAccountListOutput,
    StdAccountListInput,
    StdTestConnectionOutput,
    StdTestConnectionInput
} from '@sailpoint/connector-sdk';

import { MyAppClient } from './myApp-client'
import { Config } from './model/config';


export const connector = async () => {
    
    // Get connector source config
    const config: Config = await readConfig()

    // Use the app vendor's SDK, or implement own client as necessary, to initialize a client
    const myAppClient = new MyAppClient(config)

    return createConnector()
        .stdTestConnection(async (context: Context, input: StdTestConnectionInput, res: Response<StdTestConnectionOutput>) => {
            logger.debug('testing connector')
            res.send(await myAppClient.testConnection())
        })
        .stdAccountList(async (context: Context, _input: StdAccountListInput, res: Response<StdAccountListOutput>) => {
            const accounts = await myAppClient.getAccounts();

            for (const account of accounts) {
                res.send({
                    identity: account.id ? account.id.toString() : '',
                    uuid: account.id ? account.id.toString() : '',
                    attributes: {
                        firstName: account.firstName,
                        lastName: account.lastName,
                        email: account.email,
                    },
                });
            }
        })
};  