type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    return levels[level] >= levels[this.logLevel];
  }

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, context, data, userId, sessionId } = entry;
    let logMessage = `[${timestamp}] [${level.toUpperCase()}]`;
    
    if (context) logMessage += ` [${context}]`;
    if (userId) logMessage += ` [User: ${userId}]`;
    if (sessionId) logMessage += ` [Session: ${sessionId}]`;
    
    logMessage += ` ${message}`;
    
    if (data && this.isDevelopment) {
      logMessage += `\nData: ${JSON.stringify(data, null, 2)}`;
    }
    
    return logMessage;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: string,
    data?: any,
    userId?: string,
    sessionId?: string
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      data,
      userId,
      sessionId,
    };
  }

  debug(message: string, context?: string, data?: any, userId?: string, sessionId?: string) {
    if (!this.shouldLog('debug')) return;
    
    const entry = this.createLogEntry('debug', message, context, data, userId, sessionId);
    console.debug(this.formatLog(entry));
  }

  info(message: string, context?: string, data?: any, userId?: string, sessionId?: string) {
    if (!this.shouldLog('info')) return;
    
    const entry = this.createLogEntry('info', message, context, data, userId, sessionId);
    console.info(this.formatLog(entry));
  }

  warn(message: string, context?: string, data?: any, userId?: string, sessionId?: string) {
    if (!this.shouldLog('warn')) return;
    
    const entry = this.createLogEntry('warn', message, context, data, userId, sessionId);
    console.warn(this.formatLog(entry));
  }

  error(message: string, context?: string, error?: any, userId?: string, sessionId?: string) {
    if (!this.shouldLog('error')) return;
    
    const errorData = error instanceof Error 
      ? { 
          name: error.name, 
          message: error.message, 
          stack: error.stack 
        }
      : error;
    
    const entry = this.createLogEntry('error', message, context, errorData, userId, sessionId);
    console.error(this.formatLog(entry));
  }

  // Specialized logging methods
  api(method: string, path: string, status: number, duration?: number, userId?: string) {
    const message = `${method} ${path} - ${status}${duration ? ` (${duration}ms)` : ''}`;
    const level = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'info';
    
    this[level](message, 'API', { method, path, status, duration }, userId);
  }

  auth(action: string, userId?: string, success: boolean = true, details?: any) {
    const message = `Auth ${action} ${success ? 'successful' : 'failed'}`;
    const level = success ? 'info' : 'warn';
    
    this[level](message, 'AUTH', { action, success, ...details }, userId);
  }

  upload(fileName: string, fileSize: number, success: boolean, userId?: string, error?: any) {
    const message = `File upload ${success ? 'successful' : 'failed'}: ${fileName} (${fileSize} bytes)`;
    const level = success ? 'info' : 'error';
    
    this[level](message, 'UPLOAD', { fileName, fileSize, success, error }, userId);
  }

  database(operation: string, table: string, success: boolean, duration?: number, error?: any) {
    const message = `DB ${operation} on ${table} ${success ? 'successful' : 'failed'}${duration ? ` (${duration}ms)` : ''}`;
    const level = success ? 'debug' : 'error';
    
    this[level](message, 'DATABASE', { operation, table, success, duration, error });
  }

  security(event: string, severity: 'low' | 'medium' | 'high', details?: any, userId?: string) {
    const message = `Security event: ${event} (${severity} severity)`;
    const level = severity === 'high' ? 'error' : severity === 'medium' ? 'warn' : 'info';
    
    this[level](message, 'SECURITY', { event, severity, ...details }, userId);
  }
}

// Create singleton instance
const logger = new Logger();

export default logger;
export { Logger, type LogLevel, type LogEntry };