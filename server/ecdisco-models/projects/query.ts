import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { defaultTransform, ModelBase } from '../general/model-base';
import { QueryRule } from '../general/query-rule';
import { Production } from './production';
import { ProductionAnnotationFilter } from './production-annotation-filter';

export class Query extends ModelBase {
  @prop()
  childrenQuery: Ref<Query>[];

  @prop()
  name: string;
  @prop()
  parentQuery: Ref<Query>;
  @prop()
  parentQueryId: number;
  @prop()
  productionAnnotationFilters: ProductionAnnotationFilter[];
  @prop()
  productions: Production[];
  @prop()
  queryRule: QueryRule;
  @prop()
  queryRuleId: number;
  constructor() {
    super();
    this.childrenQuery = [];
    this.productionAnnotationFilters = [];
    this.productions = [];
  }
}

export const QueryModel = getModelForClass(Query, defaultTransform);
