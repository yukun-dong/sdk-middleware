import { Activity, Middleware, TurnContext } from "botbuilder";

export class CommandBot implements Middleware {
    public readonly commandHandlers: TeamsFxBotCommandHandler[] = [];

    constructor(commandHandlers: TeamsFxBotCommandHandler[]) {
        this.commandHandlers = commandHandlers;

    }
    async onTurn(context: TurnContext, next: () => Promise<void>): Promise<void> {
        if (context.activity.type === 'message') {
            // Invoke corresponding command handler for the command response
            const commandText = context.activity.text;
            let alreadyProcessed = false;
            for (const handler of this.commandHandlers) {
              const matchResult = handler.triggerPatterns===commandText;
              // It is important to note that the command bot will stop processing handlers
              // when the first command handler is matched.
              if (!!matchResult) {
                const message =commandText;
                const response = await handler.handleCommandReceived(context, message) as string;
      
                await context.sendActivity(response);
                alreadyProcessed = true;
                break;
              }
            }
        }
        await next();
    }

}

export interface TeamsFxBotCommandHandler {
    /**
     * The string or regular expression patterns that can trigger this handler.
     */
    triggerPatterns: string;

    /**
     * Handles a bot command received activity.
     *
     * @param context The bot context.
     * @param message The command message the user types from Teams.
     * @returns A `Promise` representing an activity or text to send as the command response.
     * Or no return value if developers want to send the response activity by themselves in this method.
     */
    handleCommandReceived(
        context: TurnContext,
        message: string
    ): Promise<string | Partial<Activity> | void>;
}