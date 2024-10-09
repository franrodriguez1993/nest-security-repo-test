import { BadRequestException } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';

export class SanitizeInput {
  // sanitize one string input
  static sanitize(text: string): string {
    // if this is undefined, the property is not requiered in the dto
    if (!text) {
      return;
    }
    const sanitizedText = sanitizeHtml(text, {
      allowedTags: [],
      allowedAttributes: {},
    });

    if (sanitizedText !== text) {
      throw new BadRequestException('Input contains malicious content');
    }

    return sanitizedText;
  }
  // sanitize objects
  static sanitizeObjects(data: any): void {
    const properpies = Object.keys(data);

    properpies.forEach((p: string) => {
      if (p !== 'html' && typeof data[p] === 'string') {
        this.sanitize(data[p]);
      }
    });
  }
}
