

import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from '@umijs/max';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import { ActionType, FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getDemoTestOneList, removeDemoTestOne, addDemoTestOne, updateDemoTestOne, exportDemoTestOne } from '@/services/demo/demoTestOne';
import UpdateForm from './edit';
import { getDictValueEnum } from '@/services/system/dict';

/**
 * add
 */
const handleAdd = async (fields: API.Demo.DemoTestOne) => {
  const hide = message.loading('loading...');
  try {
    const resp = await addDemoTestOne({ ...fields });
    hide();
    if (resp.code === 200) {
      message.success('success');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};

/**
 * update
 */
const handleUpdate = async (fields: API.Demo.DemoTestOne) => {
  const hide = message.loading('loading...');
  try {
    const resp = await updateDemoTestOne(fields);
    hide();
    if (resp.code === 200) {
      message.success('success');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};

/**
 * delete
 */
const handleRemove = async (selectedRows: API.Demo.DemoTestOne[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    const resp = await removeDemoTestOne(selectedRows.map((row) => row.testId).join(','));
    hide();
    if (resp.code === 200) {
      message.success('succss');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.Demo.DemoTestOne) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.testId];
    const resp = await removeDemoTestOne(params.join(','));
    hide();
    if (resp.code === 200) {
      message.success('succss');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};

/**
 * export
 */
const handleExport = async () => {
  const hide = message.loading('loading...');
  try {
    await exportDemoTestOne();
    hide();
    message.success('succss');
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};


const DemoTestOneTableList: React.FC = () => {
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Demo.DemoTestOne>();
  const [selectedRows, setSelectedRows] = useState<API.Demo.DemoTestOne[]>([]);

  const access = useAccess();

  /** i18n */
  const intl = useIntl();

  useEffect(() => {

  }, []);
  
  const columns: ProColumns<API.Demo.DemoTestOne>[] = [
    
      {
        title:"测试名",
        dataIndex: 'testName',
        valueType: 'text',
        hideInSearch: false,
      },
        
      {
        title:"测试类型",
        dataIndex: 'testType',
        valueType:'select',
         valueEnum:{
          value1:'label1',
          value2:'label2',
         },
        hideInSearch: false,
      },
        
      {
        title:"状态",
        dataIndex: 'status',
        valueType: 'digit',
        hideInSearch: false,
      },
        
      {
        title:"测试内容",
        dataIndex: 'testContent',
        valueType: 'text',
        hideInSearch: false,
      },
        
      {
        title:"生效时间",
        dataIndex: 'startDate',
        valueType: 'dateTime',
        hideInSearch: false,
      },
        
      {
        title:"备注",
        dataIndex: 'remark',
        valueType: 'text',
        hideInSearch: false,
      },
        
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          hidden={!access.hasPerms('demo:demoTestOne:edit')}
          onClick={() => {
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="编辑" />
        </Button>,
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!access.hasPerms('demo:demoTestOne:remove')}
          onClick={async () => {
            Modal.confirm({
              title: <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />,
              content: <FormattedMessage id="pages.searchTable.deleteRemind" defaultMessage="确定删除该项吗？" />,
              okText:  <FormattedMessage id="pages.searchTable.confirm" defaultMessage="确认" />,
              cancelText: <FormattedMessage id="pages.searchTable.cancel" defaultMessage="取消" />,
              onOk: async () => {
                const success = await handleRemoveOne(record);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable<API.Demo.DemoTestOne>
          headerTitle={<FormattedMessage id="pages.searchTable.title" defaultMessage="查询表格" />}
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="testId"
          key="demoTestOneList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!access.hasPerms('demo:demoTestOne:add')}
              onClick={async () => {
                setCurrentRow(undefined);
                setModalVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Button>,
            <Button
              type="primary"
              key="remove"
              hidden={selectedRows?.length === 0 || !access.hasPerms('demo:demoTestOne:remove')}
              onClick={async () => {
                Modal.confirm({
                  title:  <FormattedMessage id="pages.searchTable.batchDeleteRemind" defaultMessage="是否确认删除所选数据项?" />,
                  icon:  <ExclamationCircleOutlined />,
                  content: <FormattedMessage id="pages.searchTable.remind" defaultMessage="请谨慎操作!" />,
                  async onOk() {
                    const success = await handleRemove(selectedRows);
                    if (success) {
                      setSelectedRows([]);
                      actionRef.current?.reloadAndRest?.();
                    }
                  },
                  onCancel() {},
                });
              }}
            >
              <DeleteOutlined />
              <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
            </Button>,
            <Button
              type="primary"
              key="export"
              hidden={!access.hasPerms('demo:demoTestOne:export')}
              onClick={async () => {
                await handleExport();
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
            </Button>,
          ]}
          request={(params) =>
            getDemoTestOneList({ ...params } as API.Demo.DemoTestOneListParams).then((res) => {
              const result = {
                data: res.rows,
                total: res.total,
                success: true,
              };
              return result;
            })
          }
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
      </div>
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />
              <a style={{ fontWeight: 600 }}>{selectedRows.length}</a>
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            key="remove"
            hidden={!access.hasPerms('demo:demoTestOne:remove')}
            onClick={async () => {
              Modal.confirm({
                title: <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />,
                content: <FormattedMessage id="pages.searchTable.deleteRemind" defaultMessage="确定删除该项吗？" />,
                okText:  <FormattedMessage id="pages.searchTable.confirm" defaultMessage="确认" />,
                cancelText: <FormattedMessage id="pages.searchTable.cancel" defaultMessage="取消" />,
                onOk: async () => {
                  const success = await handleRemove(selectedRows);
                  if (success) {
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }
                },
              });
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          if (values.testId) {
            success = await handleUpdate({ ...values } as API.Demo.DemoTestOne);
          } else {
            success = await handleAdd({ ...values } as API.Demo.DemoTestOne);
          }
          if (success) {
            setModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        open={modalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default DemoTestOneTableList

    