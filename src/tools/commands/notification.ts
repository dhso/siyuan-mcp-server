import { z } from 'zod';
import { createHandler } from '../../utils/client.js';
import { McpMode, registry } from '../../utils/registry.js';
import { CommandHandler } from '../../utils/registry.js';

const namespace = 'notification';

// Push message
const pushMsgHandler: CommandHandler = {
    namespace,
    name: 'pushMsg',
    description: 'Push a message notification',
    params: z.object({
        msg: z.string().describe('Message content'),
        timeout: z.number().optional().describe('Message display duration in milliseconds')
    }),
    handler: createHandler('/api/notification/pushMsg'),
    mode: [McpMode.WRITE],
    documentation: {
        description: 'Push a message notification',
        params: {
            msg: {
                type: 'string',
                description: 'Message content',
                required: true
            },
            timeout: {
                type: 'number',
                description: 'Message display duration in milliseconds',
                required: false
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {}
        },
        examples: [
            {
                description: 'This example shows how to display a temporary notification message to the user for 7 seconds, useful for showing operation success or status updates.',
                params: {
                    msg: "Hello World",
                    timeout: 7000
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#push-message'
    }
};

// Push error message
const pushErrMsgHandler: CommandHandler = {
    namespace,
    name: 'pushErrMsg',
    description: 'Push an error message notification',
    params: z.object({
        msg: z.string().describe('Error message content'),
        timeout: z.number().optional().describe('Message display duration in milliseconds')
    }),
    handler: createHandler('/api/notification/pushErrMsg'),
    mode: [McpMode.WRITE],
    documentation: {
        description: 'Push an error message notification',
        params: {
            msg: {
                type: 'string',
                description: 'Error message content',
                required: true
            },
            timeout: {
                type: 'number',
                description: 'Message display duration in milliseconds',
                required: false
            }
        },
        returns: {
            type: 'object',
            description: 'Operation result',
            properties: {}
        },
        examples: [
            {
                description: 'This example demonstrates displaying an error notification that persists for 7 seconds, highlighting a failed operation or system issue to the user.',
                params: {
                    msg: "Operation failed",
                    timeout: 7000
                },
                response: {}
            }
        ],
        apiLink: 'https://github.com/siyuan-note/siyuan/blob/master/API.md#push-error-message'
    }
};

// Register all notification related commands
export function registerNotificationHandlers() {
    registry.registerCommand(pushMsgHandler);
    registry.registerCommand(pushErrMsgHandler);
} 