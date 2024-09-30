import React, { useEffect } from 'react';
import {
  ProForm,
  ProFormDigit,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  } from '@ant-design/pro-components';
import { Form, Modal} from 'antd';
import { useIntl, FormattedMessage } from '@umijs/max';
import { DictValueEnumObj } from '@/components/DictTag';

export type PostFormData = Record<string, unknown> & Partial<API.System.Post>;

export type PostFormProps = {
  onCancel: (flag?: boolean, formVals?: PostFormData) => void;
  onSubmit: (values: PostFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.Post>;
  statusOptions: DictValueEnumObj;
};

const PostForm: React.FC<PostFormProps> = (props) => {
  const [form] = Form.useForm();

  const { statusOptions, } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
			postId: props.values.postId,
			postCode: props.values.postCode,
			postName: props.values.postName,
			postSort: props.values.postSort,
			status: props.values.status,
			createBy: props.values.createBy,
			createTime: props.values.createTime,
			updateBy: props.values.updateBy,
			updateTime: props.values.updateTime,
			remark: props.values.remark,
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
    props.onSubmit(values as PostFormData);
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.post.title',
        defaultMessage: '编辑岗位信息',
      })}
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
          name="postId"
          label={intl.formatMessage({
            id: 'system.post.post_id',
            defaultMessage: '岗位编号',
          })}
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          disabled
          hidden={true}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="enum.form.validate.required" defaultMessage="请输入岗位编号！" />,
            },
          ]}
        />
        <ProFormText
          name="postName"
          label={intl.formatMessage({
            id: 'system.post.post_name',
            defaultMessage: '岗位名称',
          })}
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="enum.placeholder.input" defaultMessage="请输入岗位名称"/>
            },
          ]}
        />
        <ProFormText
          name="postCode"
          label={intl.formatMessage({
            id: 'system.post.post_code',
            defaultMessage: '岗位编码',
          })}
          placeholder={intl.formatMessage({id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="enum.form.validate.required" defaultMessage="请输入岗位编码！" />,
            },
          ]}
        />
        <ProFormDigit
          name="postSort"
          label={intl.formatMessage({
            id: 'system.post.post_sort',
            defaultMessage: '显示顺序',
          })}
          placeholder={intl.formatMessage({id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="enum.form.validate.required" defaultMessage="请输入显示顺序！" />,
            },
          ]}
        />
        <ProFormRadio.Group
          valueEnum={statusOptions}
          name="status"
          label={intl.formatMessage({
            id: 'system.post.status',
            defaultMessage: '状态',
          })}
          placeholder={intl.formatMessage({id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="enum.form.validate.required" defaultMessage="请输入状态！" />,
            },
          ]}
        />
        <ProFormTextArea
          name="remark"
          label={intl.formatMessage({
            id: 'system.post.remark',
            defaultMessage: '备注',
          })}
          placeholder={intl.formatMessage({id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="enum.form.validate.required" defaultMessage="请输入备注！" />,
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default PostForm;
