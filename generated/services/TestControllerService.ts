/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_ExecuteCodeRespond_ } from '../models/BaseResponse_ExecuteCodeRespond_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestControllerService {

    /**
     * sandbox
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static sandboxUsingPost(): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/test/sandbox',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * test
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static testUsingPost(): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/test/test',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * testAsync
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static testAsyncUsingPost(): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/test/testAsync',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * testFunction
     * @returns BaseResponse_ExecuteCodeRespond_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static testFunctionUsingPost(): CancelablePromise<BaseResponse_ExecuteCodeRespond_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/test/testFunction',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
