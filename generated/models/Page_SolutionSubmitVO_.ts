/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderItem } from './OrderItem';
import type { SolutionSubmitVO } from './SolutionSubmitVO';

export type Page_SolutionSubmitVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<SolutionSubmitVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
