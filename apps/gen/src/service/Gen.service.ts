import { Injectable, Logger } from "@nestjs/common";
import { GenListReq } from "../model/req/GenListReq";
import { GenTableEntity } from "../model/entity/GenTable.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ResultData } from "apps/common/src/model/ResultData";
import { GenTableColumnEntity } from "../model/entity/GenTableCloumn.entity";
import { arraysContains, capitalize, getColumnLength, lowercaseFirstLetter, uppercaseFirstLetter } from "../utils";

import { index as templateIndex } from "../template/index";
import { GenTableDto } from "../model/dto/GenTableDto";
import * as fs from 'fs-extra';
// import archiver from 'archiver';
import * as path from 'path';
import { GenDbTableListReq } from "../model/req/GenDbTableListReq";
import { isNotEmpty } from "class-validator";
import { FormatDate, GetNowDate } from "apps/common/src/utils/normal.tool";
import { CreateGenTableDto } from "../model/dto/CreateGenTableDto";
import * as config from "config"
import { GenConstants } from "../model/constant/GenConstants";
import { StringUtils } from "../utils/StringUtils";
import { camelCase, toLower } from "lodash";

const archiver = require('archiver');

@Injectable()
export class GenService{
  private logger = new Logger(GenService.name)

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(GenTableEntity)
    private readonly genTableEntityRepository: Repository<GenTableEntity>,
    @InjectRepository(GenTableColumnEntity)
    private readonly genTableColumnEntityRepository: Repository<GenTableColumnEntity>,
  ) {
  }

  async findAll(query: GenListReq) {
    const { current = 1, pageSize = 10, tableName, tableComment } = query;
    const entity = this.genTableEntityRepository.createQueryBuilder('entity');
    entity.where('1=1');
    if (tableName) {
      entity.andWhere('entity.tableName LIKE :tableName', { tableName: `%${tableName}%` });
    }
    if (tableComment) {
      entity.andWhere('entity.comment LIKE :tableComment', { tableComment: `%${tableComment}%` });
    }
    const [list, total] = await entity
      .skip((current - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return {
      code:200,
      msg:"success",
      rows:list,
      total
    };
  }
  /**
   * 预览生成代码
   * @param id
   * @returns
   */
  async preview(id: number) {
    const data = await this.genTableEntityRepository.findOne({ where: { tableId: id } });
    const columns = await this.genTableColumnEntityRepository.find({ where: { tableId: id} });
    const primaryKey = this.getPrimaryKey(columns);
    const info = { primaryKey, BusinessName: capitalize(data.businessName), ...data, columns };
    return ResultData.ok(templateIndex(info));
  }

  private getPrimaryKey(columns) {
    for (let column of columns) {
      if (column.isPk === '1') {
        return column.javaField;
      }
    }
    return null;
  }

  /**
   * 根据id查询表详细信息
   * @param id
   * @returns
   */
  async findOne(id: number) {
    const allTable =  await this.genTableEntityRepository.find();
    const data = allTable.find(item=>item.tableId===id);
    for (let table of allTable) {
      table["columns"] = await this.genTableColumnEntityRepository.find({ where: { tableId: table.tableId } });
    }

     if(data.options){
       const optionsObj = JSON.parse(data.options)
       data["treeCode"] = optionsObj["treeCode"]
       data["treeParentCode"] = optionsObj["treeParentCode"]
       data["treeName"] = optionsObj["treeName"]
       data["parentMenuId"] = optionsObj["parentMenuId"]
       data["parentMenuName"] = optionsObj["parentMenuName"]
     }

    let result = {
      info:data,
      rows:data["columns"],
      tables:allTable
    }
    return ResultData.ok(result);
  }

  async remove(id: number) {
    await this.genTableEntityRepository.delete({ tableId: id });
    await this.genTableColumnEntityRepository.delete({ tableId: id });
    return ResultData.ok();
  }

  /**
   * 修改代码生成信息
   * @param genTableUpdate
   * @returns
   */
  async genUpdate(genTableUpdate: GenTableDto) {
    for (const item of genTableUpdate.columns) {
      if (item.columnId) await this.genTableColumnEntityRepository.update({ columnId: item.columnId }, item);
    }
    delete genTableUpdate.columns;
    await this.genTableEntityRepository.update({ tableId: +genTableUpdate.tableId }, genTableUpdate);
    return ResultData.ok();
  }

  /**
   * 生成代码压缩包
   * @param tables
   * @param res
   */
  async batchGenCode(tables: string, res) {
    const zipFilePath = path.join(__dirname, 'temp.zip');
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });
    output.on('close', async () => {
      res.download(zipFilePath, 'ruoyi-nest.zip', async (err) => {
        if (!err) await fs.remove(zipFilePath);
        else res.status(500).send('Error downloading file');
      });
    });

    archive.on('error', (err: any) => {
      throw err;
    });
    const tableNamesList = tables.split(',');
    const tableList = await Promise.all(
      tableNamesList.map(async (item) => {
        const data = await this.genTableEntityRepository.findOne({ where: { tableName: item } });
        const columns = await this.genTableColumnEntityRepository.find({ where: { tableId: data.tableId } });
        const primaryKey = await this.getPrimaryKey(columns);
        return { primaryKey, BusinessName: data.businessName, ...data, columns };
      }),
    );

    archive.pipe(output);
    for (const item of tableList) {
      const list = templateIndex(item);
      const lfclassName = lowercaseFirstLetter(item.className);
      const i18n = item.internationalize == '1'
      let templates = [
        // backend
        { content: list['tool/template/nestjs/entity.ts.vm'], path: `nestjs/${item.packageName}/model/entity/${item.className}.entity.ts` },
        { content: list['tool/template/nestjs/dto.ts.vm'], path: `nestjs/${item.packageName}/model/dto/${item.className}Dto.ts` },
        { content: list['tool/template/nestjs/req.ts.vm'], path: `nestjs/${item.packageName}/model/req/${item.className}Req.ts` },
        { content: list['tool/template/nestjs/controller.ts.vm'], path: `nestjs/${item.packageName}/controller/${item.className}.controller.ts` },
        { content: list['tool/template/nestjs/dao.ts.vm'], path: `nestjs/${item.packageName}/dao/${item.className}.dao.ts` },
        { content: list['tool/template/nestjs/service.ts.vm'], path: `nestjs/${item.packageName}/service/${item.className}.service.ts` },
        { content: list['tool/template/nestjs/module.ts.vm'], path: `nestjs/${item.packageName}/${item.className}.module.ts` },

        // { content: list['tool/template/vue/api.js.vm'], path: `vue/${item.BusinessName}/${item.businessName}.js` },
        // { content: list['tool/template/vue/indexVue.vue.vm'], path: `vue/${item.BusinessName}/${item.businessName}/index.vue` },
        // { content: list['tool/template/vue/dialogVue.vue.vm'], path: `vue/${item.BusinessName}/${item.businessName}/components/indexDialog.vue` },
        // react-ui
        { content: list['tool/template/react/service.ts.vm'], path: `react/services/${item.moduleName}/${lfclassName}.ts` },

        { content: list['tool/template/react/types.ts.vm'], path: `react/types/${item.moduleName}/${lfclassName}.d.ts` },
        { content: list['tool/template/react/index.ts.vm'], path: `react/pages/${uppercaseFirstLetter(item.moduleName)}/${item.className}/index.tsx` },
        { content: list['tool/template/react/edit.ts.vm'], path: `react/pages/${uppercaseFirstLetter(item.moduleName)}/${item.className}/edit.tsx` },
        //menu sql
        { content: list['tool/template/sql/menu.sql.ts.vm'], path: `/${lfclassName}Menu.sql` },
      ];
      if(i18n){
        templates= [
          ...templates,
          { content: list['tool/template/react/i18n.zh.ts.vm'], path: `react/locales/zh-CN/${item.moduleName}/${lfclassName}.ts` },
          { content: list['tool/template/react/i18n.en.ts.vm'], path: `react/locales/en-US/${item.moduleName}/${lfclassName}.ts` },
        ]
      }

      for (const template of templates) {
        if (!template.content) throw new Error('One or more templates are undefined');
        archive.append(Buffer.from(template.content), { name: template.path });
      }
    }
    await archive.finalize();
  }

  /**
   * 查询db数据库列表
   * @returns
   */
  async genDbList(q: GenDbTableListReq) {
    const params = [];
    let sql = `
    select table_name as tableName, table_comment as tableComment, create_time as createTime,update_time as updateTime from information_schema.tables
    where table_schema = (select database())
    and table_name NOT LIKE 'qrtz_%' and table_name NOT LIKE 'gen_%'
    and table_name NOT IN (select table_name from gen_table)`;
    let sqlCount = `
    select count(*) as total from information_schema.tables
    where table_schema = (select database())
    and table_name NOT LIKE 'qrtz_%' and table_name NOT LIKE 'gen_%'
    and table_name NOT IN (select table_name from gen_table)
    `;
    if (isNotEmpty(q.tableName)) {
      sql += ` and table_name like concat("%", ?,"%") `;
      sqlCount += ` and table_name like concat("%", ?,"%") `;
      params.push(q.tableName);
    }
    if (isNotEmpty(q.tableComment)) {
      sql += ` and table_comment like concat("%", ?,"%") `;
      sqlCount += ` and table_comment like concat("%", ?,"%") `;
      params.push(q.tableComment);
    }
    sql += `
      ORDER BY create_time desc, update_time desc
      limit ${(q.current - 1) * q.pageSize},${q.pageSize}
      	`;
    const data = {
      list: await this.dataSource.query(sql, params).then((res) =>
        res.map((v) => ({
          ...v,
          createTime: FormatDate(v.createTime),
          updateTime: FormatDate(v.updateTime),
        })),
      ),
      total: Number((await this.dataSource.query(sqlCount, params))[0]?.total),
    };
    return {
      code:200,
      msg:"success",
      rows:data.list,
      total:data.total
    };
  }


  /**
   * 导入表
   * @param tables
   * @param req
   * @returns
   */
  async importTable(tables: string, req: any) {
    const tableNames = tables.split(',');
    const tableList = await this.selectDbTableListByNames(tableNames);

    for (const table of tableList) {
      const tableName = table.tableName;
      let flag = false;
      if(config.get("gen.autoRemovePre")){
        const prefixs:string[] =  config.get("gen.tablePrefix")
        try {
          if (prefixs.includes(tableName.split("_")[0] + "_")) {
            flag = true;
          }
        } catch (e) {
          this.logger.error(e)
        }
      }
      let className;
      try {
        className = flag ? StringUtils.toPascalCase(tableName.slice(tableName.indexOf("_") + 1)) : StringUtils.toPascalCase(tableName);
      } catch (e) {
        className = StringUtils.toPascalCase(tableName);
      }
      const tableData: CreateGenTableDto = {
        tableName: tableName,
        tableComment: table.tableComment?.trim() || table.tableName,
        className: className,
        packageName:  config.get("gen.packageName"),
        moduleName:  config.get("gen.moduleName"),
        // businessName: StringUtils.toCamelCase(tableName.slice(tableName.indexOf('_') + 1)), //生成业务名
        businessName: lowercaseFirstLetter(className), //生成业务名
        functionName: table.tableComment?.trim() || table.tableName, //生成功能名
        internationalize: '0', //国际化
        options:JSON.stringify({parentMenuId: 0}),
        functionAuthor: config.get("gen.author"),
        createBy: req.user.userName,
      };
      const tableInfo = await this.genTableEntityRepository.save(tableData);

      const tableColumn: any = await this.getTableColumnInfo(tableName);

      for (const column of tableColumn) {
        this.initTableColumn(column, tableInfo);
        column.sort = Number(column.sort);
        await this.genTableColumnEntityRepository.save(column);
      }
    }
    return ResultData.ok('添加成功');
  }

  /**
   * 根据表名获取表的字段信息以及注释
   * @param tableName
   * @returns
   */
  async getTableColumnInfo(tableName: string) {
    if (!tableName) return null;
    return this.dataSource.query(
      `SELECT column_name AS columnName,
      (CASE WHEN (is_nullable = 'no' && column_key != 'PRI') THEN '1' ELSE '0' END) AS isRequired,
      (CASE WHEN column_key = 'PRI' THEN '1' ELSE '0' END) AS isPk,
      ordinal_position AS sort, 
      column_comment AS columnComment, 
      (CASE WHEN extra = 'auto_increment' THEN '1' ELSE '0' END) AS isIncrement, 
      SUBSTRING_INDEX(column_type, '(', 1) AS columnType
      FROM information_schema.columns WHERE table_schema = (SELECT DATABASE())  AND table_name = '${tableName}' ORDER BY ordinal_position`,
    );
  }

  /**
   * 根据表名批量获取表的基本信息（包含注释）
   * @param tableNames
   * @returns
   */
  selectDbTableListByNames(tableNames: string[]) {
    if (!tableNames.length) return null;
    return this.dataSource.query(
      `select table_name as tableName, table_comment as tableComment, create_time as createTime, update_time as updateTime from information_schema.tables
      where table_schema = (select database())
      and table_name NOT LIKE 'qrtz_%' and table_name NOT LIKE 'gen_%'
      and table_name NOT IN (select table_name from gen_table)
      and table_name IN (${'?,'.repeat(tableNames.length).slice(0, -1)})`,
      tableNames,
    );
  }

  /**
   * 初始化表列的字段信息
   * @param column
   * @param table
   */
  initTableColumn(column: any, table: any) {

    const columnName = column.columnName;
    const dataType = column.columnType;
    column.tableId = table.tableId;
    column.javaField = camelCase(columnName);
    column.javaType = GenConstants.TYPE_STRING;
    column.queryType = GenConstants.QUERY_EQ;
    column.createBy = column.createBy || 'admin';
    column.columnComment = column.columnComment || column.columnName;
    column.createTime = column.createTime || GetNowDate();
    column.updateBy = 'admin';
    column.updateTime = GetNowDate();
    if (arraysContains(GenConstants.COLUMNTYPE_TEXT, dataType)) {
      column.htmlType = GenConstants.HTML_TEXTAREA;
    } else if (arraysContains(GenConstants.COLUMNTYPE_STR, dataType)) {
      const len = getColumnLength(dataType);
      column.htmlType = len >= 500 ? GenConstants.HTML_TEXTAREA : GenConstants.HTML_INPUT;
    } else if (arraysContains(GenConstants.COLUMNTYPE_TIME, dataType)) {
      column.javaType = GenConstants.TYPE_DATE;
      column.htmlType = GenConstants.HTML_DATETIME;
    } else if (arraysContains(GenConstants.COLUMNTYPE_NUMBER, dataType)) {
      column.htmlType = GenConstants.HTML_INPUT;
      column.javaType = GenConstants.TYPE_NUMBER;
    }
    // 插入字段（默认所有字段都需要插入）
    if(!GenConstants.NU_REQUIRE_COLUMN.includes(columnName) && column.isPk != '1'){
      column.isInsert = GenConstants.REQUIRE;
    }else{
      column.isInsert = GenConstants.UN_REQUIRE;
    }
    // 编辑字段
    if(!GenConstants.NU_REQUIRE_COLUMN.includes(columnName)){
      column.isEdit = GenConstants.REQUIRE;
    }else{
      column.isEdit = GenConstants.UN_REQUIRE;
    }
    // 列表字段
    if(!GenConstants.NU_REQUIRE_COLUMN.includes(columnName) && column.isPk != '1'){
      column.isList = GenConstants.REQUIRE;
    }else{
      column.isList = GenConstants.UN_REQUIRE;
    }
    // 查询字段
    if(!GenConstants.NU_REQUIRE_COLUMN.includes(columnName) && column.isPk != '1'){
      column.isQuery = GenConstants.REQUIRE;
    }else{
      column.isQuery = GenConstants.UN_REQUIRE;
    }

    const lowerColumnName = toLower(columnName);
    // 查询字段类型
    if (lowerColumnName.includes('name')) {
      column.queryType = GenConstants.QUERY_LIKE;
    }
    // 状态字段设置单选框
    if (lowerColumnName.includes('status')) {
      column.htmlType = GenConstants.HTML_RADIO;
    }
    // 类型&性别字段设置下拉框
    else if (lowerColumnName.includes('type') || lowerColumnName.includes('sex')) {
      column.htmlType = GenConstants.HTML_SELECT;
    }
    //日期字段设置日期控件
    else if (lowerColumnName.includes('time') || lowerColumnName.includes('_date') || lowerColumnName.includes('Date')) {
      column.htmlType = GenConstants.HTML_DATETIME;
      // column.queryType = GenConstants.QUERY_BETWEEN;
    }
    // 图片字段设置图片上传控件
    else if (lowerColumnName.includes('image')) {
      column.htmlType = GenConstants.HTML_IMAGE_UPLOAD;
    }
    // 文件字段设置文件上传控件
    else if (lowerColumnName.includes('file')) {
      column.htmlType = GenConstants.HTML_FILE_UPLOAD;
    }
    // 内容字段设置textarea
    else if (lowerColumnName.includes('content')) {
      column.htmlType = GenConstants.HTML_TEXTAREA;
    }
  }
}