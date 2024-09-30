
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from '@umijs/max';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import { ActionType, FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getDeptList, removeDept, addDept, updateDept, exportDept, getDeptListExcludeChild } from '@/services/system/dept';
import UpdateForm from './edit';
import { getDictValueEnum } from '@/services/system/dict';
import { buildTreeData } from '@/utils/tree';
import DictTag from '@/components/DictTag';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.System.Dept) => {
  const hide = message.loading('loading...');
  try {
    const resp = await addDept({ ...fields });
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
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.Dept) => {
  const hide = message.loading('loading...');
  try {
    const resp = await updateDept(fields);
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
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.System.Dept[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    const resp = await removeDept(selectedRows.map((row) => row.deptId).join(','));
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

const handleRemoveOne = async (selectedRow: API.System.Dept) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.deptId];
    const resp = await removeDept(params.join(','));
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
 * 导出数据
 *
 *
 */
const handleExport = async () => {
  const hide = message.loading('loading...');
  try {
    await exportDept();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};


const DeptTableList: React.FC = () => {
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.System.Dept>();
  const [selectedRows, setSelectedRows] = useState<API.System.Dept[]>([]);

  const [deptTree, setDeptTree] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    getDictValueEnum('sys_normal_disable').then((data) => {
      setStatusOptions(data);
    });
  }, []);

  const columns: ProColumns<API.System.Dept>[] = [
    {
      title: <FormattedMessage id="system.dept.dept_name" defaultMessage="部门名称" />,
      dataIndex: 'deptName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="system.dept.order_num" defaultMessage="显示顺序" />,
      dataIndex: 'orderNum',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="system.dept.status" defaultMessage="部门状态" />,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
      render: (_, record) => {
        return (<DictTag enums={statusOptions} value={record.status} />);
      },
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
          hidden={!access.hasPerms('system:dept:edit')}
          onClick={() => {
            getDeptListExcludeChild(record.deptId).then((res) => {
              if (res.code === 200) {
                let depts = buildTreeData(res.data, 'deptId', 'deptName', '', '', '');
                if(depts.length === 0) {
                  depts = [{ id: 0, title: '无上级', children: undefined, key: 0, value: 0 }];
                }
                setDeptTree(depts);
                setModalVisible(true);
                setCurrentRow(record);
              } else {
                message.warning(res.msg);
              }
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="编辑" />
        </Button>,
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!access.hasPerms('system:dept:remove')}
          onClick={async () => {
            Modal.confirm({
              title: intl.formatMessage({id:'pages.searchTable.delete', defaultMessage: '删除'}),
              content: intl.formatMessage({id:'pages.searchTable.deleteRemind', defaultMessage: '确定删除该项吗？'}),
              okText: intl.formatMessage({id:'pages.searchTable.confirm', defaultMessage: '确认'}),
              cancelText: intl.formatMessage({id:'pages.searchTable.cancel', defaultMessage: '取消'}),
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
        <ProTable<API.System.Dept>
          headerTitle={intl.formatMessage({
            id: 'pages.searchTable.title',
            defaultMessage: '信息',
          })}
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="deptId"
          key="deptList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!access.hasPerms('system:dept:add')}
              onClick={async () => {
                getDeptList().then((res) => {
                  if (res.code === 200) {
                    setDeptTree(buildTreeData(res.data, 'deptId', 'deptName', '', '', ''));
                    setCurrentRow(undefined);
                    setModalVisible(true);
                  } else {
                    message.warning(res.msg);
                  }
                });
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Button>,
            <Button
              type="primary"
              key="remove"
              hidden={selectedRows?.length === 0 || !access.hasPerms('system:dept:remove')}
              onClick={async () => {
                Modal.confirm({
                  title: intl.formatMessage({id:'pages.searchTable.batchDeleteRemind', defaultMessage: '是否确认删除所选数据项?'}),
                  icon: <ExclamationCircleOutlined />,
                  content: intl.formatMessage({id:'pages.searchTable.remind', defaultMessage: '请谨慎操作!'}),
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
              hidden={!access.hasPerms('system:dept:export')}
              onClick={async () => {
                handleExport();
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
            </Button>,
          ]}
          request={(params) =>
            getDeptList({ ...params } as API.System.DeptListParams).then((res) => {
              const result = {
                data: buildTreeData(res.data, 'deptId', '', '', '', ''),
                total: res.data.length,
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
            hidden={!access.hasPerms('system:dept:del')}
            onClick={async () => {
              Modal.confirm({
                title: intl.formatMessage({id:'pages.searchTable.delete', defaultMessage: '删除'}),
                content: intl.formatMessage({id:'pages.searchTable.deleteRemind', defaultMessage: '确定删除该项吗？'}),
                okText: intl.formatMessage({id:'pages.searchTable.confirm', defaultMessage: '确认'}),
                cancelText: intl.formatMessage({id:'pages.searchTable.cancel', defaultMessage: '取消'}),
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
          if (values.deptId) {
            success = await handleUpdate({ ...values } as API.System.Dept);
          } else {
            success = await handleAdd({ ...values } as API.System.Dept);
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
        deptTree={deptTree}
        statusOptions={statusOptions}
      />
    </PageContainer>
  );
};

export default DeptTableList;
