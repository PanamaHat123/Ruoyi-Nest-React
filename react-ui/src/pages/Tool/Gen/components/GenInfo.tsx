import { Button, Col, Divider, Form, Row, TreeSelect } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import type { TableInfo } from '../data';
import styles from '../style.less';
import { DataNode } from 'antd/es/tree';
import { ProForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { history, FormattedMessage, useIntl } from "@umijs/max";

export type GenInfoProps = {
  values?: any;
  menuData?: DataNode[];
  tableInfo?: TableInfo[];
  onStepSubmit?: any;
};

const GenInfo: React.FC<GenInfoProps> = (props) => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const [pathType, setPathType] = useState<string>('0');
  const [tlpType, setTlpType] = useState<string>('curd');

  const [subTablesColumnOptions, setSubTablesColumnOptions] = useState<any[]>();

  const { menuData, tableInfo, onStepSubmit } = props;

  const tablesOptions = tableInfo?.map((item: any) => {
    return {
      value: item.tableName,
      label: `${item.tableName}：${item.tableComment}`,
    };
  });

  if (tableInfo) {
    for (let index = 0; index < tableInfo?.length; index += 1) {
      const tbl = tableInfo[index];
      if (tbl.tableName === props.values.subTableName) {
        const opts = [];
        tbl.columns.forEach((item) => {
          opts.push({
            value: item.columnName,
            label: `${item.columnName}: ${item.columnComment}`,
          });
        });
        break;
      }
    }
  }

  const treeColumns = props.values.columns.map((item: any) => {
    return {
      value: item.columnName,
      label: `${item.columnName}: ${item.columnComment}`,
    };
  });

  const onSubmit = async (direction: string) => {
    const values = await form.validateFields();
    onStepSubmit('gen', values, direction);
  };

  useEffect(() => {
    setPathType(props.values.genType);
    setTlpType(props.values.tplCategory);
  }, [props.values.genType, props.values.tplCategory]);

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <ProForm
            form={form}
            onFinish={async () => {
              const values = await form.validateFields();
              onStepSubmit('gen', values);
            }}
            initialValues={{
              curd: props.values.curd,
              tree: props.values.tree,
              sub: props.values.sub,
              tplCategory: props.values.tplCategory,
              packageName: props.values.packageName,
              moduleName: props.values.moduleName,
              businessName: props.values.businessName,
              functionName: props.values.functionName,
              internationalize: props.values.internationalize,
              parentMenuId: props.values.parentMenuId,
              genType: props.values.genType,
              genPath: props.values.genPath,
              treeCode: props.values.treeCode,
              treeParentCode: props.values.treeParentCode,
              treeName: props.values.treeName,
              subTableName: props.values.subTableName,
              subTableFkName: props.values.subTableFkName,
            }}
            submitter={{
              resetButtonProps: {
                style: { display: 'none' },
              },
              submitButtonProps: {
                style: { display: 'none' },
              },
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12} order={1}>
                <ProFormSelect
                  fieldProps={{
                    onChange: (val) => {
                      setTlpType(val);
                    },
                  }}
                  valueEnum={{
                    crud: <FormattedMessage id="tool.gen.singleType" defaultMessage="单表（增删改查）" />
                    // tree: '树表（增删改查）',
                    // sub: '主子表（增删改查）',
                  }}
                  name="tplCategory"
                  label={<FormattedMessage id="tool.gen.genType" defaultMessage="生成模板" />}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </Col>
              <Col span={12} order={2}>
                <ProFormText
                  name="packageName"
                  label={<FormattedMessage id="tool.gen.packagePath" defaultMessage="生成包路径" />}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12} order={1}>
                <ProFormText
                  name="moduleName"
                  label={<FormattedMessage id="tool.gen.moduleName" defaultMessage="生成模块名" />}
                />
              </Col>
              <Col span={12} order={2}>
                <ProFormText
                  name="businessName"
                  label={<FormattedMessage id="tool.gen.businessName" defaultMessage="生成业务名" />}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12} order={1}>
                <ProFormText
                  name="functionName"
                  label={<FormattedMessage id="tool.gen.businessDescription" defaultMessage="生成功能描述" />}
                />
              </Col>
              <Col span={12} order={2}>
                <ProForm.Item
                  labelCol={{ span: 20 }}
                  name="parentMenuId"
                  label={<FormattedMessage id="tool.gen.parentMenu" defaultMessage="父菜单" />}
                  rules={[{required: true}]}
                >
                  <TreeSelect
                    style={{ width: '74%' }}
                    defaultValue={props.values.parentMenuId}
                    treeData={menuData}
                    placeholder={<FormattedMessage id="enum.placeholder.input" defaultMessage="请输入" />}
                  />
                </ProForm.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <ProFormRadio.Group
                  valueEnum={{
                    '0': <FormattedMessage id="tool.gen.zip" defaultMessage="zip压缩包" />,
                    // '1': '自定义路径',
                  }}
                  name="genType"
                  label={<FormattedMessage id="tool.gen.outputMode" defaultMessage="生成代码方式" />}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  fieldProps={{
                    onChange: (e) => {
                      setPathType(e.target.value);
                    },
                  }}
                />
              </Col>
              <Col span={12}>
                <ProFormRadio.Group
                  valueEnum={{
                    '0': <FormattedMessage id="enum.form.option.N" defaultMessage="否" />,
                    '1': <FormattedMessage id="enum.form.option.Y" defaultMessage="是" />,
                  }}
                  name="internationalize"
                  label={<FormattedMessage id="tool.gen.isI18n" defaultMessage="是否国际化" />}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24} order={1}>
                <ProFormText
                  hidden={pathType === '0'}
                  width="md"
                  name="genPath"
                  label={<FormattedMessage id="tool.gen.customPath" defaultMessage="自定义路径" />}
                />
              </Col>
            </Row>
            <div hidden={tlpType !== 'tree'}>
              <Divider orientation="left">
                <FormattedMessage id="tool.gen.otherInfo" defaultMessage="其他信息" />
              </Divider>
              <Row gutter={[16, 16]}>
                <Col span={12} order={1}>
                  <ProFormSelect
                    name="treeCode"
                    label={<FormattedMessage id="tool.gen.treeField" defaultMessage="树编码字段" />}
                    options={treeColumns}
                    rules={[
                      {
                        required: tlpType === 'tree',
                      },
                    ]}
                  />
                </Col>
                <Col span={12} order={2}>
                  <ProFormSelect
                    name="treeParentCode"
                    label={<FormattedMessage id="tool.gen.treeParentField" defaultMessage="树父编码字段" />}
                    options={treeColumns}
                    rules={[
                      {
                        required: tlpType === 'tree',
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12} order={1}>
                  <ProFormSelect
                    name="treeName"
                    label={<FormattedMessage id="tool.gen.treeField2" defaultMessage="树名称字段" />}
                    options={treeColumns}
                    rules={[
                      {
                        required: tlpType === 'tree',
                      },
                    ]}
                  />
                </Col>
              </Row>
            </div>
            <div hidden={tlpType !== 'sub'}>
              <Divider orientation="left">
                <FormattedMessage id="tool.gen.relateInfo" defaultMessage="关联信息" />
              </Divider>
              <Row gutter={[16, 16]}>
                <Col span={12} order={1}>
                  <ProFormSelect
                    name="subTableName"
                    label={<FormattedMessage id="tool.gen.treeField3" defaultMessage="关联子表的表名" />}
                    options={tablesOptions}
                    rules={[
                      {
                        required: tlpType === 'sub',
                      },
                    ]}
                    fieldProps={{
                      onChange: (val) => {
                        form.setFieldsValue({
                          subTableFkName: '',
                        });
                        if (tableInfo) {
                          for (let index = 0; index < tableInfo?.length; index += 1) {
                            const tbl = tableInfo[index];
                            if (tbl.tableName === val) {
                              const opts: any[] = [];
                              tbl.columns.forEach((item) => {
                                opts.push({
                                  value: item.columnName,
                                  label: `${item.columnName}：${item.columnComment}`,
                                });
                              });
                              setSubTablesColumnOptions(opts);
                              break;
                            }
                          }
                        }
                      },
                    }}
                  />
                </Col>
                <Col span={12} order={2}>
                  <ProFormSelect
                    name="subTableFkName"
                    options={subTablesColumnOptions}
                    label={<FormattedMessage id="tool.gen.treeField4" defaultMessage="子表关联的外键名" />}
                    rules={[
                      {
                        required: tlpType === 'sub',
                      },
                    ]}
                  />
                </Col>
              </Row>
            </div>
          </ProForm>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={4}>
          <Button
            type="primary"
            onClick={() => {
              history.back();
            }}
          >
            <FormattedMessage id="tool.gen.goback" defaultMessage="返回" />
          </Button>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            className={styles.step_buttons}
            onClick={() => {
              onSubmit('prev');
            }}
          >
            <FormattedMessage id="tool.gen.prev" defaultMessage="上一步" />
          </Button>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            onClick={() => {
              onSubmit('next');
            }}
          >
            <FormattedMessage id="tool.gen.submit" defaultMessage="提交" />
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default GenInfo;
