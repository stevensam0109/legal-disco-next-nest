import {
  getModelForClass,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';
import { ObjectID } from 'bson';
import { Document } from '../../api/document';
import { defaultTransform, ModelBase } from '../general/model-base';
import { documentFieldTableNamePrefix } from './document-field';

export class DocumentFieldBooleanValue extends ModelBase {
  @prop()
  documentId: ObjectID;
  @prop()
  document: Document;
}

// TODO: ONly Pass id and build collection name.
export const DocumentFieldBooleanValueModel = (
  fieldId: ObjectID,
): ReturnModelType<typeof DocumentFieldBooleanValue, BeAnObject> => {
  return getModelForClass(DocumentFieldBooleanValue, {
    ...defaultTransform,
    ...{
      schemaOptions: {
        collection: `${documentFieldTableNamePrefix}${fieldId}`,
      },
    },
  });
};
