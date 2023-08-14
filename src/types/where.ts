export type Operator = 'equals' | 'contains' | 'not_equals' | 'in' | 'all' | 'not_in' | 'exists' | 'greater_than' | 'greater_than_equal' | 'less_than' | 'less_than_equal' | 'like' | 'near';

export type WhereField = {
    [key in Operator]?: unknown;
};

export type Where = {
    [key: string]: WhereField | Where[];
    // @ts-expect-error
    or?: Where[];
    // @ts-expect-error
    and?: Where[];
};

export type Query = {
  where?: Where;
  limit?: number;
  page?: number;
  pagination?: boolean;
  sort?: string;
};
