import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParseQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    // 在这里可以应用 ParseQueryPipe 或其他逻辑来转换 query
    return query; // 返回转换后的查询参数
  },
);