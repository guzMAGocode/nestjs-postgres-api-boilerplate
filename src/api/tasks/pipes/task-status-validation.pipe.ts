import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    
    readonly allowedStatusOptions = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    
    transform(value: any) {
        
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) throw new BadRequestException(`"${value}" is not a valid status`);

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatusOptions.indexOf(status);
        return index !== -1;
    }
}