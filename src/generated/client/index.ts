//@ts-nocheck
import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const StrategyScalarFieldEnumSchema = z.enum(['id', 'updatedAt', 'name', 'text', 'sql']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// STRATEGY SCHEMA
/////////////////////////////////////////

export const StrategySchema = z.object({
  id: z.string(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  text: z.string(),
  sql: z.string(),
})

export type Strategy = z.infer<typeof StrategySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// STRATEGY
//------------------------------------------------------

export const StrategySelectSchema: z.ZodType<Prisma.StrategySelect> = z.object({
  id: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  text: z.boolean().optional(),
  sql: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const StrategyWhereInputSchema: z.ZodType<Prisma.StrategyWhereInput> = z.object({
  AND: z.union([z.lazy(() => StrategyWhereInputSchema), z.lazy(() => StrategyWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => StrategyWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => StrategyWhereInputSchema), z.lazy(() => StrategyWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  sql: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();

export const StrategyOrderByWithRelationInputSchema: z.ZodType<Prisma.StrategyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sql: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StrategyWhereUniqueInputSchema: z.ZodType<Prisma.StrategyWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const StrategyOrderByWithAggregationInputSchema: z.ZodType<Prisma.StrategyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sql: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StrategyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StrategyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StrategyMinOrderByAggregateInputSchema).optional()
}).strict();

export const StrategyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StrategyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => StrategyScalarWhereWithAggregatesInputSchema), z.lazy(() => StrategyScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => StrategyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => StrategyScalarWhereWithAggregatesInputSchema), z.lazy(() => StrategyScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  text: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  sql: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();

export const StrategyCreateInputSchema: z.ZodType<Prisma.StrategyCreateInput> = z.object({
  id: z.string(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  text: z.string(),
  sql: z.string()
}).strict();

export const StrategyUncheckedCreateInputSchema: z.ZodType<Prisma.StrategyUncheckedCreateInput> = z.object({
  id: z.string(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  text: z.string(),
  sql: z.string()
}).strict();

export const StrategyUpdateInputSchema: z.ZodType<Prisma.StrategyUpdateInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  text: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sql: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const StrategyUncheckedUpdateInputSchema: z.ZodType<Prisma.StrategyUncheckedUpdateInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  text: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sql: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const StrategyCreateManyInputSchema: z.ZodType<Prisma.StrategyCreateManyInput> = z.object({
  id: z.string(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  text: z.string(),
  sql: z.string()
}).strict();

export const StrategyUpdateManyMutationInputSchema: z.ZodType<Prisma.StrategyUpdateManyMutationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  text: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sql: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const StrategyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StrategyUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  text: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sql: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const StrategyCountOrderByAggregateInputSchema: z.ZodType<Prisma.StrategyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sql: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StrategyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StrategyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sql: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StrategyMinOrderByAggregateInputSchema: z.ZodType<Prisma.StrategyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  sql: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const StrategyFindFirstArgsSchema: z.ZodType<Prisma.StrategyFindFirstArgs> = z.object({
  select: StrategySelectSchema.optional(),
  where: StrategyWhereInputSchema.optional(),
  orderBy: z.union([StrategyOrderByWithRelationInputSchema.array(), StrategyOrderByWithRelationInputSchema]).optional(),
  cursor: StrategyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: StrategyScalarFieldEnumSchema.array().optional(),
}).strict()

export const StrategyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StrategyFindFirstOrThrowArgs> = z.object({
  select: StrategySelectSchema.optional(),
  where: StrategyWhereInputSchema.optional(),
  orderBy: z.union([StrategyOrderByWithRelationInputSchema.array(), StrategyOrderByWithRelationInputSchema]).optional(),
  cursor: StrategyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: StrategyScalarFieldEnumSchema.array().optional(),
}).strict()

export const StrategyFindManyArgsSchema: z.ZodType<Prisma.StrategyFindManyArgs> = z.object({
  select: StrategySelectSchema.optional(),
  where: StrategyWhereInputSchema.optional(),
  orderBy: z.union([StrategyOrderByWithRelationInputSchema.array(), StrategyOrderByWithRelationInputSchema]).optional(),
  cursor: StrategyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: StrategyScalarFieldEnumSchema.array().optional(),
}).strict()

export const StrategyAggregateArgsSchema: z.ZodType<Prisma.StrategyAggregateArgs> = z.object({
  where: StrategyWhereInputSchema.optional(),
  orderBy: z.union([StrategyOrderByWithRelationInputSchema.array(), StrategyOrderByWithRelationInputSchema]).optional(),
  cursor: StrategyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StrategyGroupByArgsSchema: z.ZodType<Prisma.StrategyGroupByArgs> = z.object({
  where: StrategyWhereInputSchema.optional(),
  orderBy: z.union([StrategyOrderByWithAggregationInputSchema.array(), StrategyOrderByWithAggregationInputSchema]).optional(),
  by: StrategyScalarFieldEnumSchema.array(),
  having: StrategyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StrategyFindUniqueArgsSchema: z.ZodType<Prisma.StrategyFindUniqueArgs> = z.object({
  select: StrategySelectSchema.optional(),
  where: StrategyWhereUniqueInputSchema,
}).strict()

export const StrategyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StrategyFindUniqueOrThrowArgs> = z.object({
  select: StrategySelectSchema.optional(),
  where: StrategyWhereUniqueInputSchema,
}).strict()

export const StrategyCreateArgsSchema: z.ZodType<Prisma.StrategyCreateArgs> = z.object({
  select: StrategySelectSchema.optional(),
  data: z.union([StrategyCreateInputSchema, StrategyUncheckedCreateInputSchema]),
}).strict()

export const StrategyUpsertArgsSchema: z.ZodType<Prisma.StrategyUpsertArgs> = z.object({
  select: StrategySelectSchema.optional(),
  where: StrategyWhereUniqueInputSchema,
  create: z.union([StrategyCreateInputSchema, StrategyUncheckedCreateInputSchema]),
  update: z.union([StrategyUpdateInputSchema, StrategyUncheckedUpdateInputSchema]),
}).strict()

export const StrategyCreateManyArgsSchema: z.ZodType<Prisma.StrategyCreateManyArgs> = z.object({
  data: StrategyCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const StrategyDeleteArgsSchema: z.ZodType<Prisma.StrategyDeleteArgs> = z.object({
  select: StrategySelectSchema.optional(),
  where: StrategyWhereUniqueInputSchema,
}).strict()

export const StrategyUpdateArgsSchema: z.ZodType<Prisma.StrategyUpdateArgs> = z.object({
  select: StrategySelectSchema.optional(),
  data: z.union([StrategyUpdateInputSchema, StrategyUncheckedUpdateInputSchema]),
  where: StrategyWhereUniqueInputSchema,
}).strict()

export const StrategyUpdateManyArgsSchema: z.ZodType<Prisma.StrategyUpdateManyArgs> = z.object({
  data: z.union([StrategyUpdateManyMutationInputSchema, StrategyUncheckedUpdateManyInputSchema]),
  where: StrategyWhereInputSchema.optional(),
}).strict()

export const StrategyDeleteManyArgsSchema: z.ZodType<Prisma.StrategyDeleteManyArgs> = z.object({
  where: StrategyWhereInputSchema.optional(),
}).strict()

interface StrategyGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.StrategyArgs
  readonly type: Omit<Prisma.StrategyGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

export const tableSchemas = {
  Strategy: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "updatedAt",
        "TIMESTAMP"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "text",
        "TEXT"
      ],
      [
        "sql",
        "TEXT"
      ]
    ]),
    relations: [
    ],
    modelSchema: (StrategyCreateInputSchema as any)
      .partial()
      .or((StrategyUncheckedCreateInputSchema as any).partial()),
    createSchema: StrategyCreateArgsSchema,
    createManySchema: StrategyCreateManyArgsSchema,
    findUniqueSchema: StrategyFindUniqueArgsSchema,
    findSchema: StrategyFindFirstArgsSchema,
    updateSchema: StrategyUpdateArgsSchema,
    updateManySchema: StrategyUpdateManyArgsSchema,
    upsertSchema: StrategyUpsertArgsSchema,
    deleteSchema: StrategyDeleteArgsSchema,
    deleteManySchema: StrategyDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof StrategyUncheckedCreateInputSchema>,
    Prisma.StrategyCreateArgs['data'],
    Prisma.StrategyUpdateArgs['data'],
    Prisma.StrategyFindFirstArgs['select'],
    Prisma.StrategyFindFirstArgs['where'],
    Prisma.StrategyFindUniqueArgs['where'],
    never,
    Prisma.StrategyFindFirstArgs['orderBy'],
    Prisma.StrategyScalarFieldEnum,
    StrategyGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
