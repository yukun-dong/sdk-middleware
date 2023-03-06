import { Activity, TurnContext } from "botbuilder";
import { TeamsFxBotCommandHandler } from "./sdk/CommandBot";

export class HelloWorldCommandHandler implements TeamsFxBotCommandHandler {
    triggerPatterns = "hello";

    async handleCommandReceived(
        context: TurnContext,
        message: string
    ): Promise<string | Partial<Activity> | void> {
        console.log(`Bot received message: ${message}`);
        return `hello!`;
    }
}

export class TestCommandHandler implements TeamsFxBotCommandHandler {
    triggerPatterns = "test";

    async handleCommandReceived(
        context: TurnContext,
        message: string
    ): Promise<string | Partial<Activity> | void> {
        console.log(`Bot received message: ${message}`);
        return `test something`;
    }
}