import {
    CloudAdapter, Middleware, TurnContext, Request,
    Response,
    ConfigurationBotFrameworkAuthentication,
    ConfigurationServiceClientCredentialFactory,
} from "botbuilder";
import config from "../config";

export class ConversationBot {
    adapter: CloudAdapter;

    public constructor(adapterConfig: { [key: string]: string }) {
        const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
            MicrosoftAppId: adapterConfig.botId,
            MicrosoftAppPassword: adapterConfig.botPassword,
            MicrosoftAppType: "MultiTenant",
        });

        const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
            {},
            credentialsFactory
        );
        this.adapter = new CloudAdapter(botFrameworkAuthentication);
    }

    public async requestHandler(
        req: Request,
        res: Response,
        logic?: (context: TurnContext) => Promise<any>
    ): Promise<void> {
        if (logic === undefined) {
            // create empty logic
            logic = async () => { };
        }

        await this.adapter.process(req, res, logic);
    }


    public use(middleware: Middleware) {
        this.adapter.use(middleware);
    }
}