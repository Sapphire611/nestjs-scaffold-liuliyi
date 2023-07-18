import { Model, PipelineStage } from 'mongoose';
import { PaginateResult, PaginationOptions } from '../interfaces';

/**
 * 用于 mongo 聚合分页 查询
 * @param model mongoose model
 * @param oprs 聚合管道pipeline
 * @param options 分页参数
 * @returns  Promise<PaginateResult<T>>
 * @example aggregatePaginate(this.userModel, oprs, { perPage: +query.size, page: +query.page });
 */

// 这个文件暂时用不到，因为会使用插件 mongoose-paginate-v2
export const aggregatePaginate: <T>(model: Model<T>, oprs: Array<PipelineStage>, options: PaginationOptions) => Promise<PaginateResult<T>> = async (
  model: Model<any>,
  oprs: Array<PipelineStage>,
  options: PaginationOptions
) => {
  const page = options.page ?? 1;
  const perPage = options.perPage ?? 10;

  // 没有太好的办法，只能先查询总数，再查询分页数据
  const count = await model.aggregate([...oprs, { $count: 'total' }]).then(res => res[0]?.total ?? 0);

  oprs.push({
    $skip: (page - 1) * perPage,
  });
  oprs.push({
    $limit: perPage,
  });
  
  const result = await model.aggregate(oprs);

  return {
    data: result,
    metadata: {
      total: count,
      perPage: perPage,
      page: page,
      lastPage: Math.ceil(count / perPage),
    },
  };
};
