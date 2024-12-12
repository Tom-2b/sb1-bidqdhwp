import { Command, CommandResult } from './types';
import { useSessionStore } from '../../store/sessionStore';
import { useChatStore } from '../../store/chatStore';
import { logger } from '../../utils/logger';

export class CommandProcessor {
  static async processCommand(command: Command): Promise<CommandResult> {
    if (command.error) {
      return {
        success: false,
        message: command.error
      };
    }

    try {
      switch (command.type) {
        case 'set':
          return await this.handleSetCommand(command);
        case 'trigger':
          return await this.handleTriggerCommand(command);
        default:
          return {
            success: false,
            message: `Unknown command type: ${command.type}`
          };
      }
    } catch (error) {
      logger.error(`Command processing error: ${error}`);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private static async handleSetCommand(command: Command): Promise<CommandResult> {
    if (!command.variable) {
      return { success: false, message: 'No variable specified' };
    }

    if (!command.value) {
      return { success: false, message: 'No value specified' };
    }

    const sessionStore = useSessionStore.getState();

    switch (command.variable) {
      case 'username':
        sessionStore.setUserName(command.value);
        return {
          success: true,
          message: `Username set to: ${command.value}`
        };

      case 'decision':
        const [text, options] = command.value.split(' vs ').map(s => s.trim());
        if (!text || !options) {
          return {
            success: false,
            message: 'Decision must be in format: "text vs optionA vs optionB"'
          };
        }
        const [optionA, optionB] = options.split(' vs ').map(s => s.trim());
        if (!optionA || !optionB) {
          return {
            success: false,
            message: 'Both options must be provided, separated by "vs"'
          };
        }
        sessionStore.setDecision(text, optionA, optionB);
        return {
          success: true,
          message: `Decision set: ${text} (${optionA} vs ${optionB})`
        };

      case 'dimensions':
        const dimensions = command.value.split(';').map(d => d.trim()).filter(Boolean);
        if (dimensions.length === 0) {
          return {
            success: false,
            message: 'At least one dimension must be provided'
          };
        }
        sessionStore.setDimensions(dimensions);
        return {
          success: true,
          message: `Dimensions set: ${dimensions.join(', ')}`
        };

      case 'context':
        const context = command.value.split(';').map(c => c.trim()).filter(Boolean);
        if (context.length === 0) {
          return {
            success: false,
            message: 'At least one context item must be provided'
          };
        }
        sessionStore.setContext(context);
        return {
          success: true,
          message: `Context set: ${context.join(', ')}`
        };

      default:
        return {
          success: false,
          message: `Unknown variable: ${command.variable}`
        };
    }
  }

  private static async handleTriggerCommand(command: Command): Promise<CommandResult> {
    if (!command.variable) {
      return {
        success: false,
        message: 'No trigger action specified'
      };
    }

    const chatStore = useChatStore.getState();
    const phaseMatch = command.variable.match(/^phase(\d+)$/i);

    if (phaseMatch) {
      const phaseNumber = parseInt(phaseMatch[1], 10);
      const targetPhase = chatStore.phases.find(p => p.name.toLowerCase() === `phase ${phaseNumber}`);

      if (!targetPhase) {
        return {
          success: false,
          message: `Phase ${phaseNumber} not found`
        };
      }

      chatStore.setCurrentPhase(targetPhase.id);
      return {
        success: true,
        message: `Switched to ${targetPhase.name}`
      };
    }

    return {
      success: false,
      message: `Unknown trigger action: ${command.variable}`
    };
  }
}