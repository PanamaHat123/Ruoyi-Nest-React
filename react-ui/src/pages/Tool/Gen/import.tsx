import { Button, Card, message, Layout } from 'antd';
import React, { useState } from 'react';
import { history, FormattedMessage, useIntl } from "@umijs/max";
import { importTables, queryTableList } from './service';
import type { GenCodeType } from './data.d';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';

const { Content } = Layout;

const handleImport = async (tables: string) => {
  const hide = message.loading('loading...');
  try {
    await importTables(tables);
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};

const ImportTableList: React.FC = () => {
  const [selectTables, setSelectTables] = useState<string[]>([]);
  const intl = useIntl()

  const columns: ProColumns<GenCodeType>[] = [
    {
      title:  <FormattedMessage id="tool.gen.tableName" defaultMessage="表名称" />,
      dataIndex: 'tableName',
    },
    {
      title:  <FormattedMessage id="tool.gen.tableDescription" defaultMessage="表描述" />,
      dataIndex: 'tableComment',
    },
    {
      title:  <FormattedMessage id="tool.gen.createTime" defaultMessage="创建时间" />,
      dataIndex: 'createTime',
      valueType: 'textarea',
      hideInSearch: true,
    },
  ];

  return (
    <Content>
      <Card bordered={false}>
        <ProTable<GenCodeType>
          headerTitle={intl.formatMessage({
            id: 'tool.gen.title',
            defaultMessage: '代码生成信息',
          })}
          rowKey="tableName"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={async () => {
                if (selectTables.length < 1) {
                  message.error(intl.formatMessage({
                    id: 'tool.gen.error.remind2',
                    defaultMessage: '请选择要导入的表',
                  }));
                  return;
                }
                const success = await handleImport(selectTables.join(','));
                if (success) {
                  history.back();
                }
              }}
            >
              <PlusOutlined /> <FormattedMessage id="tool.gen.submit" defaultMessage="提交" />
            </Button>,
            <Button
              type="primary"
              key="goback"
              onClick={() => {
                history.back();
              }}
            >
              <RollbackOutlined /> <FormattedMessage id="tool.gen.goback" defaultMessage="返回" />
            </Button>,
          ]}
          request={(params) =>
            queryTableList({ ...params }).then((res) => {
              return {
                data: res.rows,
                total: res.total,
                success: true,
              };
            })
          }
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              if (selectedRows && selectedRows.length > 0) {
                const tables = selectedRows.map((row) => {
                  return row.tableName;
                });
                setSelectTables(tables);
              }
            },
          }}
        />
      </Card>
    </Content>
  );
};

export default ImportTableList;
