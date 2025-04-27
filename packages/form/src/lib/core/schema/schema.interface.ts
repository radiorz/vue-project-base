export interface Schema {
  type: string;
  name: string;
  title?: string;
  description?: string;
  properties?: {
    [key: string]: Schema;
  };
  required?: string[];
  items?: Schema;
  enum?: any[];
  const?: any;
  format?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  multipleOf?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  // relations
  dependencies?: {
    [key: string]: string[];
  };
}
