import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { defaultTransform, ModelBase } from '../general/model-base';

export class DocumentField extends ModelBase {
  @prop()
  children: Ref<DocumentField>[];

  @prop()
  name: string;
  @prop()
  parent: Ref<DocumentField>;
  @prop()
  parentId: number;
  @prop()
  type: number;

  constructor() {
    super();
    this.children = [];
  }
}

export const documentFieldTableNamePrefix = 'DocumentField_';

export const DocumentFieldModel = getModelForClass(
  DocumentField,
  defaultTransform,
);
