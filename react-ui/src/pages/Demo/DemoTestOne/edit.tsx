

import React, { useEffect } from 'react';
import { Form, Modal} from 'antd';
import { useIntl, FormattedMessage } from '@umijs/max';
import { getDictValueEnum } from '@/services/system/dict';
import { ProForm,ProFormDigit,ProFormText,ProFormDateTimePicker,ProFormRadio, ProFormCheckbox, ProFormTextArea, ProFormSelect } from "@ant-design/pro-form";

export type DemoTestOneFormData = Record<string, unknown> & Partial<API.Demo.DemoTestOne>;

export type DemoTestOneFormProps = {
  onCancel: (flag?: boolean, formVals?: DemoTestOneFormData) => void;
  onSubmit: (values: DemoTestOneFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.Demo.DemoTestOne>;
};

const DemoTestOneForm: React.FC<DemoTestOneFormProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      
      testId: props.values.testId,
      testName: props.values.testName,
      testType: props.values.testType,
      status: props.values.status,
      testContent: props.values.testContent,
      startDate: props.values.startDate,
      remark: props.values.remark,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
    });
  }, [form, props]);

  const intl = useIntl();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
  };
  const handleFinish = async (values: Record<string, any>) => {
    props.onSubmit(values as DemoTestOneFormData);
  };

  return (
    <Modal
      width={640}
      title={<FormattedMessage id={props.values["testId"]?'enum.form.edit_content':'enum.form.add_content'} defaultMessage="测试demo1" values={{content:"测试demo1"}}/>}
      open={props.open}
      forceRender
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ProForm
        form={form}
        grid={true}
        submitter={false}
        layout="horizontal"
        onFinish={handleFinish}>
        
        <ProFormDigit
          name="testId"
          label="测试id"
          disabled
          hidden={true}
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="enum.form.validate.required_content" defaultMessage="测试id必填" values={{content:"测试id"}} />
            },
            {
              pattern: new RegExp(/^[0-9]*$/),
              message: <FormattedMessage id="enum.form.validate.number_content" defaultMessage="测试id非数字" values={{content:"测试id"}} />
            }
          ]}
        />
      
        <ProFormText
          name="testName"
          label="测试名"
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="enum.form.validate.required_content" defaultMessage="测试名必填" values={{content:"测试名"}} />
            },
          ]}
        />
      
        <ProFormSelect
           valueEnum={{
            '0':'label1',
            '1':'label2',
           }}
          name="testType"
          label="测试类型"
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="enum.form.validate.required_content" defaultMessage="测试类型必填" values={{content:"测试类型"}} />
            },
          ]}
        />
      
        <ProFormRadio.Group
           options={[
            {
              label:'demoLabel',
              value:1
            }
           ]}
          name="status"
          label="状态"
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="enum.form.validate.required_content" defaultMessage="状态必填" values={{content:"状态"}} />
            },
            {
              pattern: new RegExp(/^[0-9]*$/),
              message: <FormattedMessage id="enum.form.validate.number_content" defaultMessage="状态非数字" values={{content:"状态"}} />
            }
          ]}
        />
      
        <ProFormTextArea
          name="testContent"
          label="测试内容"
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="enum.form.validate.required_content" defaultMessage="测试内容必填" values={{content:"测试内容"}} />
            },
          ]}
        />
      
        <ProFormDateTimePicker
          name="startDate"
          label="生效时间"
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="enum.form.validate.required_content" defaultMessage="生效时间必填" values={{content:"生效时间"}} />
            },
          ]}
        />
      
        <ProFormText
          name="remark"
          label="备注"
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="enum.form.validate.required_content" defaultMessage="备注必填" values={{content:"备注"}} />
            },
          ]}
        />
      
      </ProForm>
    </Modal>
  );
};

export default DemoTestOneForm;

    