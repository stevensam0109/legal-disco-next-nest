﻿import { Controller } from '@nestjs/common';
import {
  ChildRule,
  ChildRuleModel,
  QueryRule,
  QueryRuleModel,
} from '../../../../../ecdisco-models/general/query-rule';
import { Query, QueryModel } from '../../../../../ecdisco-models/projects/query';
import { ProjectBaseController } from '../project-base-controller';
import { Search } from './search';

@Controller()
export class SearchController extends ProjectBaseController {
  async GetSearches(): Promise<Query[]> {
    return await QueryModel.find({});
  }

  Load(search: any): QueryRule {
    const queryId: number = search.queryId as number;

    return new Search().Load(queryId, true, this.projectContext);
  }

  async Save(search: any) {
    const query: Query = search as Query;
    // TODO: recursively call for nested query. and also added modified need to handle.
    // EntityState entityState = query.id === 0 ? EntityState.Added : EntityState.Modified;
    // EntityEntry<Query> entityEntry = projectContext.Entry(query);

    // EntityEntry.State = entityState;

    const QueryRuleId = (
      await QueryRuleModel.create({
        condition: query.queryRule.condition,
      } as QueryRule)
    ).id;

    query.queryRule.rules.forEach((queryRule: ChildRule) => {
      ChildRuleModel.create({
        operation: queryRule.operation,
        fieldId: queryRule.fieldId,
        parentQueryRuleId: QueryRuleId,
        value: queryRule.value,
        fieldType: queryRule.fieldType,
      } as ChildRule);
    });

    QueryModel.updateOne(
      { id: query.id },
      { $set: { queryRuleId: QueryRuleId } }
    );
  }
}