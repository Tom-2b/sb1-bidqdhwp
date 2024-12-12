import { Command } from './types';

export function parseCommand(input: string): Command | null {
  const trimmed = input.trim();
  if (!trimmed.startsWith('/')) return null;

  // First split by spaces to get the command type
  const [commandType, ...rest] = trimmed.slice(1).split(' ');
  const type = commandType.toLowerCase();

  if (type === 'set') {
    // Join the rest back together and split by colon for variable name
    const restString = rest.join(' ');
    const colonIndex = restString.indexOf(':');
    
    // If there's no colon or it's the last character, return error
    if (colonIndex === -1 || colonIndex === restString.length - 1) {
      return {
        type: 'set',
        raw: trimmed,
        error: 'Variable name must be followed by a colon'
      };
    }

    const variable = restString.slice(0, colonIndex).trim().toLowerCase();
    const value = restString.slice(colonIndex + 1).trim();

    if (!variable || !value) {
      return {
        type: 'set',
        raw: trimmed,
        error: 'Both variable name and value are required'
      };
    }

    return {
      type: 'set',
      variable,
      value,
      raw: trimmed
    };
  }

  if (type === 'trigger') {
    // For trigger commands, support both colon and space syntax
    const restString = rest.join(' ');
    const colonIndex = restString.indexOf(':');
    
    let action: string;
    let params: string;

    if (colonIndex !== -1) {
      action = restString.slice(0, colonIndex).trim().toLowerCase();
      params = restString.slice(colonIndex + 1).trim();
    } else {
      [action = '', ...rest] = rest;
      params = rest.join(' ').trim();
    }

    if (!action) {
      return {
        type: 'trigger',
        raw: trimmed,
        error: 'No trigger action specified'
      };
    }

    return {
      type: 'trigger',
      variable: action.toLowerCase(),
      value: params,
      raw: trimmed
    };
  }

  return null;
}