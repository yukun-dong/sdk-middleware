
// import { CommandBot } from "./CommandBot";
import { ConversationBot } from "./sdk/ConversationBot";
import { HelloWorldCommandHandler, TestCommandHandler } from "./helloWorldHandler";
import config from "./config";
import { CommandBot } from "./sdk/CommandBot";


export const commandApp = new ConversationBot(config);
commandApp.use(new CommandBot([new HelloWorldCommandHandler(),new TestCommandHandler()]));
// commandApp.use(new WorkFlowBot([new DoStuffHandler()]));