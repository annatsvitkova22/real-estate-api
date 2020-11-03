import { 
    ExceptionFilter, Catch, 
    ArgumentsHost
} from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse(); // < RETURNS OutgoingMessage (Stream)
    
        response.status(500).json({ message: 'ERROR' })
    }
}