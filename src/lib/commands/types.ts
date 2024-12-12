export type CommandType = 'set' | 'trigger';

export interface Command {
  type: CommandType;
  variable?: string;
  value?: string;
  raw: string;
  error?: string;
}

export interface CommandResult {
  success: boolean;
  message: string;
  data?: any;
}