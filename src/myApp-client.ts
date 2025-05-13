import { ConnectorError, StdTestConnectionOutput } from "@sailpoint/connector-sdk"
import { Config } from "./model/config";
import { User } from "./model/user";


/**
 * MyApp is the client that communicates with MyApp (reqres.in) APIs.
 */
export class MyAppClient {
    private readonly apiKey?: string
	private readonly baseUrl?: string
	httpClient: HTTP;
	
    constructor(config: Config) {
        
		// Fetch necessary properties from config.
      
		this.apiKey = config?.apiKey
		if (this.apiKey == null) {
			throw new ConnectorError('apiKey must be provided from config')
        }
		
		this.baseUrl = config?.baseUrl
        if (this.baseUrl == null) {
            throw new ConnectorError('baseUrl must be provided from config')
        }
		
		this.httpClient = HTTPFactory.getHTTP(config);
    }
	
	//Test Connection
	async testConnection(): Promise<StdTestConnectionOutput> {
        const accountsList = await this.httpClient.get<User[]>('/users')
        if (accountsList.status !== 200) {
            throw new ConnectorError("Unable to connect to MyApp")
        }
        return {}
    }
	
	//Account Aggregation
	async getAccounts(): Promise<User[]> {
		const response = await this.httpClient.get('/users');
		const accounts: User[] = response.data.data.map((user: any) => ({
			id: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
		}));
		return accounts;
	}
	
}
