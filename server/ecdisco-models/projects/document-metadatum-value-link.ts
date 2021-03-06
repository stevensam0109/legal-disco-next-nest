import { prop } from '@typegoose/typegoose';
import { ObjectID } from 'bson';
import { Connection } from 'mongoose';
import { getCommonModelForClass, ModelBase } from '../general/model-base';
import { DocumentMetadatumValue } from './document-metadatum-value';

export class DocumentMetadatumValueLink extends ModelBase {
  @prop()
  documentMetadataValue: string;

  @prop()
  documentMetadataValueId: ObjectID;

  @prop()
  documentMetadatumValues: DocumentMetadatumValue[];

  @prop()
  metadataId: ObjectID;

  @prop()
  documentId: ObjectID;

  constructor() {
    super();
    this.documentMetadatumValues = [];
  }
}

export const DocumentMetadatumValueLinkModel = (connection: Connection, MetadatumId: ObjectID) => {
  return getCommonModelForClass(DocumentMetadatumValueLink, connection, MetadatumId);
};
