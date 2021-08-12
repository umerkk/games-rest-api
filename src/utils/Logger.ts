import * as Winston from 'winston';

/**
 * A singleton Logging class that uses Winston logger.
 * Production: the logs are written in files using "File Transport"
 * Development: logs are also written in stdout (slow but okay for development)
 *
 * The severity of the logs are based on the runtime environment of the application.
 */
class Logger {
    public static winstonInstance: Winston.Logger;

    private static loggerOptions: Winston.LoggerOptions = {
        level: 'info',
        format: Winston.format.combine(
            Winston.format.errors({ stack: true }),
            Winston.format.timestamp(),
            Winston.format.json(),
            Winston.format.colorize(),
        ),
        transports: [
            new Winston.transports.File({ filename: 'logs/error.log', level: 'error', handleExceptions: true }),
            new Winston.transports.File({ filename: 'logs/combined.log', handleExceptions: true }),
            new Winston.transports.File({ filename: 'logs/debug.log', level: 'debug', handleExceptions: true })
        ]
    }
    /**
     * A Immediately Invoked Function that instanties the logger & add necessary transports to it.
     */
    private static init = ((): void => {
        if (!Logger.winstonInstance) {
            Logger.winstonInstance = Winston.createLogger(Logger.loggerOptions);
        }
        if (process.env.NODE_ENV !== 'production') {
            Logger.winstonInstance.add(new Winston.transports.Console({ level: 'debug' }));
        }
    })();

}

export default Logger.winstonInstance;