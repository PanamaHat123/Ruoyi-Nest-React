import React, { Fragment, useEffect, useRef, useState } from 'react';
import type { GenCodeType } from '../data';
import { Button, Checkbox, Col, Row, Tag } from 'antd';
import type { FormInstance } from 'antd';
import styles from '../style.less';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import { history, FormattedMessage, useIntl } from "@umijs/max";

export type ColumnInfoProps = {
  parentType?: string;
  data?: any[];
  dictData?: any[];
  onStepSubmit?: any;
};

const booleanEnum = [
  {
    label: 'true',
    value: '1',
  },
  {
    label: 'false',
    value: '0',
  },
];
const radioEnum = [
  {
    value:'1',
  }
]

const ColumnInfo: React.FC<ColumnInfoProps> = (props) => {
  const formRef = useRef<FormInstance>();
  const intl = useIntl()
  const [dataSource, setDataSource] = useState<any[]>();

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const { data, dictData, onStepSubmit } = props;

  const columns: ProColumns<GenCodeType>[] = [
    {
      title: <FormattedMessage id="tool.gen.SN" defaultMessage="编号" />,
      dataIndex: 'columnId',
      editable: false,
      width: 80,
    },
    {
      title: <FormattedMessage id="tool.gen.fieldName" defaultMessage="字段名" />,
      dataIndex: 'columnName',
      editable: false,
    },
    {
      title: <FormattedMessage id="tool.gen.fieldDescription" defaultMessage="字段描述" />,
      dataIndex: 'columnComment',
      hideInForm: true,
      hideInSearch: true,
      width: 200,
    },
    {
      title: <FormattedMessage id="tool.gen.columnType" defaultMessage="字段类型" />,
      dataIndex: 'columnType',
      editable: false,
    },
    {
      title: <FormattedMessage id="tool.gen.nodejsType" defaultMessage="类型" />,
      dataIndex: 'javaType',
      valueType: 'select',
      valueEnum: {
        number: {
          text: 'number',
        },
        string: {
          text: 'string',
        },
        // Double: {
        //   text: 'Double',
        // },
        // BigDecimal: {
        //   text: 'BigDecimal',
        // },
        Date: {
          text: 'Date',
        },
      },
    },
    {
      title: <FormattedMessage id="tool.gen.nodejsFiledName" defaultMessage="属性" />,
      dataIndex: 'javaField',
      width: "150px"
    },
    {
      title: <FormattedMessage id="tool.gen.insert" defaultMessage="插入" />,
      dataIndex: 'isInsert',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
      // renderFormItem:(item, config,form,_)=>{
      //   console.log(item,config,form,_);
      //   const record = item.entry
      //   const key = item.dataIndex
      //   const columnId = record.columnId
      //   const change = ({ target })=>{
      //     let value = target.value == '1'?'0':'1';
      //     const colum = (dataSource as any[]).find(item=>item.columnId == columnId)
      //     console.log(value,dataSource,colum);
      //     colum[key] = value;
      //     setDataSource([...dataSource])
      //     console.log("change",value,dataSource);
      //   }
      //   return <Checkbox
      //     checked={record[key] === '1'}
      //     onChange={change}
      //   />
      // },
    },
    {
      title: <FormattedMessage id="tool.gen.edit" defaultMessage="编辑" />,
      dataIndex: 'isEdit',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
    },
    {
      title: <FormattedMessage id="tool.gen.list" defaultMessage="列表" />,
      dataIndex: 'isList',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
    },
    {
      title: <FormattedMessage id="tool.gen.query" defaultMessage="查询" />,
      dataIndex: 'isQuery',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
    },
    {
      title: <FormattedMessage id="tool.gen.queryType" defaultMessage="查询方式" />,
      dataIndex: 'queryType',
      valueType: 'select',
      valueEnum: {
        EQ: {
          text: '=',
        },
        NE: {
          text: '!=',
        },
        GT: {
          text: '>',
        },
        GTE: {
          text: '>=',
        },
        LT: {
          text: '<',
        },
        LTE: {
          text: '<=',
        },
        LIKE: {
          text: 'LIKE',
        },
        BETWEEN: {
          text: 'BETWEEN',
        },
      },
    },
    {
      title: <FormattedMessage id="tool.gen.required" defaultMessage="必填" />,
      dataIndex: 'isRequired',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
    },
    {
      title: <FormattedMessage id="tool.gen.htmlComponent" defaultMessage="显示类型" />,
      dataIndex: 'htmlType',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        input: {
          text: <FormattedMessage id="tool.gen.text" defaultMessage="文本框" />
        },
        textarea: {
          text: <FormattedMessage id="tool.gen.textarea" defaultMessage="文本域" />
        },
        select: {
          text: <FormattedMessage id="tool.gen.select" defaultMessage="下拉框" />
        },
        radio: {
          text: <FormattedMessage id="tool.gen.radio" defaultMessage="单选框" />
        },
        checkbox: {
          text: <FormattedMessage id="tool.gen.checkBox" defaultMessage="复选框" />
        },
        datetime: {
          text: <FormattedMessage id="tool.gen.datetime" defaultMessage="日期控件" />
        },
        // imageUpload: {
        //   text: '图片上传',
        // },
        // fileUpload: {
        //   text: '文件上传',
        // },
        // editor: {
        //   text: '富文本控件',
        // },
      },
    },
    {
      title: <FormattedMessage id="tool.gen.dictionaryType" defaultMessage="字典类型" />,
      dataIndex: 'dictType',
      hideInSearch: true,
      valueType: 'select',
      fieldProps: {
        options: dictData,
      },
      render: (text) => {
        return <Tag color="#108ee9">{text}</Tag>;
      },
    },
  ];

  useEffect(() => {
    setDataSource(data);
    if (data) {
      setEditableRowKeys(data.map((item) => item.columnId));
    }
  }, [data]);

  const onSubmit = (direction: string) => {
    if (onStepSubmit) {
      onStepSubmit('column', dataSource, direction);
    }
  };

  const onDataChange = (value: readonly GenCodeType[]) => {
    setDataSource({ ...value } as []);
  };

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <EditableProTable<GenCodeType>
            formRef={formRef}
            rowKey="columnId"
            search={false}
            columns={columns}
            value={dataSource}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
              },
              onValuesChange: (record, recordList) => {
                setDataSource(recordList);
              },
            }}
            onChange={onDataChange}
            recordCreatorProps={false}
          />
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
            <FormattedMessage id="tool.gen.next" defaultMessage="下一步" />
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ColumnInfo;
