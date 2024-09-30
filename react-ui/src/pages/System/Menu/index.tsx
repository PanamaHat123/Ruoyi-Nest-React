
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from '@umijs/max';
import { Button, message, Modal } from 'antd';
import { ActionType, FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getMenuList, removeMenu, addMenu, updateMenu, exportMenu } from '@/services/system/menu';
import UpdateForm from './edit';
import { getDictValueEnum } from '@/services/system/dict';
import { buildTreeData } from '@/utils/tree';
import { DataNode } from 'antd/es/tree';
import DictTag from '@/components/DictTag';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.System.Menu) => {
  const hide = message.loading('loading...');
  try {
    await addMenu({ ...fields });
    hide();
    message.success('success');
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
const handleUpdate = async (fields: API.System.Menu) => {
  const hide = message.loading('loading...');
  try {
    await updateMenu(fields);
    hide();
    message.success('success');
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
const handleRemove = async (selectedRows: API.System.Menu[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeMenu(selectedRows.map((row) => row.menuId).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.Menu) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.menuId];
    await removeMenu(params.join(','));
    hide();
    message.success('success');
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
    await exportMenu();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};


const MenuTableList: React.FC = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.System.Menu>();
  const [selectedRows, setSelectedRows] = useState<API.System.Menu[]>([]);

  const [menuTree, setMenuTree] = useState<DataNode[]>([]);
  const [visibleOptions, setVisibleOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    getDictValueEnum('sys_show_hide').then((data) => {
      setVisibleOptions(data);
    });
    getDictValueEnum('sys_normal_disable').then((data) => {
      setStatusOptions(data);
    });
  }, []);

  const columns: ProColumns<API.System.Menu>[] = [
    {
      title: <FormattedMessage id="system.menu.menu_name" defaultMessage="菜单名称" />,
      dataIndex: 'menuName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="system.menu.icon" defaultMessage="菜单图标" />,
      dataIndex: 'icon',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.menu.order_num" defaultMessage="显示顺序" />,
      dataIndex: 'orderNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.menu.component" defaultMessage="组件路径" />,
      dataIndex: 'component',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.menu.perms" defaultMessage="权限标识" />,
      dataIndex: 'perms',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.menu.status" defaultMessage="菜单状态" />,
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
          hidden={!access.hasPerms('system:menu:edit')}
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
          hidden={!access.hasPerms('system:menu:remove')}
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
        <ProTable<API.System.Menu>
          pagination={false}
          headerTitle={intl.formatMessage({
            id: 'pages.searchTable.title',
            defaultMessage: '信息',
          })}
          actionRef={actionRef}
          rowKey="menuId"
          key="menuList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!access.hasPerms('system:menu:add')}
              onClick={async () => {
                setCurrentRow({status:"0",menuType:"M",parentId:0} as any);
                setModalVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Button>,
            <Button
              type="primary"
              key="remove"
              hidden={selectedRows?.length === 0 || !access.hasPerms('system:menu:remove')}
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
              hidden={!access.hasPerms('system:menu:export')}
              onClick={async () => {
                handleExport();
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
            </Button>,
          ]}
          request={(params) =>
            getMenuList({ ...params } as API.System.MenuListParams).then((res) => {
              const rootMenu = { id: 0, label: intl.formatMessage({id:"system.menu.root",defaultMessage:"主类目"}), children: [] as DataNode[], value: 0 };
              const memuData = buildTreeData(res.data, 'menuId', 'menuName', '', '', '');
              rootMenu.children = memuData;
              const treeData: any = [];
              treeData.push(rootMenu);
              setMenuTree(treeData);
              return {
                data: memuData,
                total: res.data.length,
                success: true,
              };
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
            hidden={!access.hasPerms('system:menu:del')}
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
          if (values.menuId) {
            success = await handleUpdate({ ...values } as API.System.Menu);
          } else {
            success = await handleAdd({ ...values } as API.System.Menu);
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
        visibleOptions={visibleOptions}
        statusOptions={statusOptions}
        menuTree={menuTree}
      />
    </PageContainer>
  );
};

export default MenuTableList;
