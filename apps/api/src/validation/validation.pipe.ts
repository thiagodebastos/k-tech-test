import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { error } = this.schema.validate(value, { abortEarly: false });

      if (error) {
        const messages = error.details.map((err) => err.message).join(', ');
        throw new BadRequestException(`Validation failed: ${messages}`);
      }
    }

    return value;
  }
}
