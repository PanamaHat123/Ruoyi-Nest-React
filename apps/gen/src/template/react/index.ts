import { lowercaseFirstLetter, uppercaseFirstLetter } from "../../utils";
import { GenTableColumnEntity } from "../../model/entity/GenTableCloumn.entity";

export const reactIndexTem = (options) => {
  const { businessName, functionName, moduleName,className,columns,internationalize } = options;
  const lfclassName = lowercaseFirstLetter(className);
  const upperModuleName = uppercaseFirstLetter(moduleName);
  const primaryFiled = columns.find(filed => filed.isPk == "1");
  const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
  const i18n = internationalize == '1'
  return `

import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from '@umijs/max';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import { ActionType, FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { get${className}List, remove${className}, add${className}, update${className}, export${className} } from '@/services/${moduleName}/${lfclassName}';
import UpdateForm from './edit';
import { getDictValueEnum } from '@/services/system/dict';

/**
 * add
 */
const handleAdd = async (fields: API.${upperModuleName}.${className}) => {
  const hide = message.loading('loading...');
  try {
    const resp = await add${className}({ ...fields });
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
const handleUpdate = async (fields: API.${upperModuleName}.${className}) => {
  const hide = message.loading('loading...');
  try {
    const resp = await update${className}(fields);
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
const handleRemove = async (selectedRows: API.${upperModuleName}.${className}[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    const resp = await remove${className}(selectedRows.map((row) => row.${primaryFiled.javaField}).join(','));
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

const handleRemoveOne = async (selectedRow: API.${upperModuleName}.${className}) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.${primaryFiled.javaField}];
    const resp = await remove${className}(params.join(','));
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
    await export${className}();
    hide();
    message.success('succss');
    return true;
  } catch (error) {
    hide();
    message.error(error?.msg || 'failed');
    return false;
  }
};


const ${className}TableList: React.FC = () => {
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.${upperModuleName}.${className}>();
  const [selectedRows, setSelectedRows] = useState<API.${upperModuleName}.${className}[]>([]);

  const access = useAccess();

  /** i18n */
  const intl = useIntl();

  useEffect(() => {

  }, []);
  
  const columns: ProColumns<API.${upperModuleName}.${className}>[] = [
    ${createCloumnList(columns)}
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
          hidden={!access.hasPerms('${moduleName}:${businessName}:edit')}
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
          hidden={!access.hasPerms('${moduleName}:${businessName}:remove')}
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
        <ProTable<API.${upperModuleName}.${className}>
          headerTitle={<FormattedMessage id="pages.searchTable.title" defaultMessage="查询表格" />}
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="${primaryFiled.javaField}"
          key="${lfclassName}List"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!access.hasPerms('${moduleName}:${businessName}:add')}
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
              hidden={selectedRows?.length === 0 || !access.hasPerms('${moduleName}:${businessName}:remove')}
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
              hidden={!access.hasPerms('${moduleName}:${businessName}:export')}
              onClick={async () => {
                await handleExport();
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
            </Button>,
          ]}
          request={(params) =>
            get${className}List({ ...params } as API.${upperModuleName}.${className}ListParams).then((res) => {
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
            hidden={!access.hasPerms('${moduleName}:${businessName}:remove')}
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
          if (values.${primaryFiled.javaField}) {
            success = await handleUpdate({ ...values } as API.${upperModuleName}.${className});
          } else {
            success = await handleAdd({ ...values } as API.${upperModuleName}.${className});
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

export default ${className}TableList

    `;

  function createCloumnList(columns:GenTableColumnEntity[]) {
    let str = ``;
    columns.forEach(item=>{
      if(item.isList != '1'){
        return
      }
      str += `
      {
        title:${ i18n?`<FormattedMessage id="${moduleName}.${businessName}.${item.columnName}" defaultMessage="${item.columnComment}" />`:`"${item.columnComment}"`},
        dataIndex: '${item.javaField}',
        ${handleValueType(item)}
        hideInSearch: ${item.isQuery != '1'},
      },
        `
    })
    return str;
  }

  function handleValueType(item:GenTableColumnEntity){
    let str = ''
    if(item.htmlType == 'select'){
      str+=`valueType:'select',`
      if(item.dictType){
        str+=`
        request:async()=>Object.values(await getDictValueEnum('${item.dictType}')),`
      }else{
        str+=`
         valueEnum:{
          value1:'label1',
          value2:'label2',
         },`
      }
    }else{
      str+=`valueType: '${item.javaType=='number'?'digit':item.javaType=='Date'?'dateTime':'text'}',`
    }
    return str
  }

};

