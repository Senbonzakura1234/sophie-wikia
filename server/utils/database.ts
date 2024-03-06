import type { CommonRecord } from '~/server/database/postgresql/schema';
import type { APIResult, PreparedPGQuery } from '~/types/common';
import { APIError } from '~/types/common';

import type { IdQuery } from '~/types/common/zod';
import { tryCatchHandler } from '~/utils';

export const getRecord = async <TRecord extends CommonRecord>(
	query: PreparedPGQuery<TRecord | undefined>,
	{ id }: IdQuery,
) => {
	if (!id)
		return {
			result: null,
			isSuccess: false as const,
			error: new APIError({ code: 'BAD_REQUEST', message: 'Invalid Record Id' }),
		} satisfies APIResult;

	const { data, isSuccess } = await tryCatchHandler(query.execute({ id }));

	if (!isSuccess || !data)
		return {
			result: null,
			isSuccess: false as const,
			error: new APIError({ code: isSuccess ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR' }),
		} satisfies APIResult;

	return { result: { data, currentId: id }, isSuccess: true as const, error: null } satisfies APIResult;
};

export const getAllRecordIds = async (query: PreparedPGQuery<Array<{ id: string }>>) => {
	const { data, isSuccess } = await tryCatchHandler(query.execute());

	if (isSuccess) return { isSuccess, result: data, error: null } satisfies APIResult;

	return { isSuccess, result: null, error: new APIError({ code: 'INTERNAL_SERVER_ERROR' }) } satisfies APIResult;
};

export const exportRecords = async <TRecord extends CommonRecord>(query: PreparedPGQuery<Array<TRecord>>) => {
	const { data, isSuccess } = await tryCatchHandler(query.execute());

	if (isSuccess) return { isSuccess, result: data, error: null } satisfies APIResult;

	return { isSuccess, result: null, error: new APIError({ code: 'INTERNAL_SERVER_ERROR' }) } satisfies APIResult;
};
