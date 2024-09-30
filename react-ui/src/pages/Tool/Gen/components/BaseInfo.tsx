import { Button, Col, Form, message, Row } from 'antd';
import React, { Fragment, useEffect } from 'react';
import styles from '../style.less';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { history, FormattedMessage, useIntl } from "@umijs/max";

export type BaseInfoProps = {
  values?: any;
  onStepSubmit?: any;
};

const BaseInfo: React.FC<BaseInfoProps> = (props) => {
  const [form] = Form.useForm();
  const { onStepSubmit } = props;
  const intl = useIntl();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      tableName: props.values.tableName,
    });
  });

  const onValidateForm = async () => {
    const values = await form.validateFields();
    if (onStepSubmit) {
      onStepSubmit('base', values);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <ProForm
            form={form}
            onFinish={async () => {
              message.success('success');
            }}
            initialValues={{
              tableName: props.values?.tableName,
              tableComment: props.values?.tableComment,
              className: props.values?.className,
              functionAuthor: props.values?.functionAuthor,
              remark: props.values?.remark,
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
            <Row>
              <Col span={12} order={1}>
                <ProFormText
                  name="tableName"
                  label={intl.formatMessage({
                    id: 'tool.gen.tableName2',
                    defaultMessage: '表名',
                  })}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </Col>
              <Col span={12} order={2}>
                <ProFormText
                  name="tableComment"
                  label={intl.formatMessage({
                    id: 'tool.gen.tableDescription',
                    defaultMessage: '表描述',
                  })}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} order={1}>
                <ProFormText
                  name="className"
                  label={intl.formatMessage({
                    id: 'tool.gen.className2',
                    defaultMessage: '实体类名称',
                  })}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </Col>
              <Col span={12} order={2}>
                <ProFormText
                  name="functionAuthor"
                  label={intl.formatMessage({
                    id: 'tool.gen.author',
                    defaultMessage: '作者',
                  })}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ProFormTextArea
                  name="remark"
                  label={intl.formatMessage({
                    id: 'tool.gen.remark',
                    defaultMessage: '备注',
                  })}
                />
              </Col>
            </Row>
          </ProForm>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={4}>
          <Button
            type="primary"
            className={styles.step_buttons}
            onClick={() => {
              history.back();
            }}
          >
            <FormattedMessage id="tool.gen.goback" defaultMessage="返回" />
          </Button>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={onValidateForm}>
            <FormattedMessage id="tool.gen.next" defaultMessage="下一步" />
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default BaseInfo;
