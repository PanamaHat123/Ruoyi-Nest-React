import React from 'react';
import { Form, message, Row } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';
import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { updateUserProfile } from '@/services/system/user';


export type BaseInfoProps = {
  values: Partial<API.CurrentUser> | undefined;
};

const BaseInfo: React.FC<BaseInfoProps> = (props) => {
  const [form] = Form.useForm();
  const intl = useIntl();

  const handleFinish = async (values: Record<string, any>) => {
    const data = { ...props.values, ...values } as API.CurrentUser;
    const resp = await updateUserProfile(data);
    if (resp.code === 200) {
      message.success('success');
    } else {
      message.warning(resp.msg);
    }
  };

  return (
    <>
      <ProForm form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row>
          <ProFormText
            name="nickName"
            label={intl.formatMessage({
              id: 'system.user.nick_name',
              defaultMessage: '用户昵称',
            })}
            width="xl"
            placeholder={intl.formatMessage({id: 'enum.placeholder.input',
              defaultMessage: '请输入'
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage id="enum.form.validate.required" defaultMessage="请输入用户昵称！" />
                ),
              },
            ]}
          />
        </Row>
        <Row>
          <ProFormText
            name="phonenumber"
            label={intl.formatMessage({
              id: 'system.user.phonenumber',
              defaultMessage: '手机号码',
            })}
            width="xl"
            placeholder={intl.formatMessage({id: 'enum.placeholder.input',
              defaultMessage: '请输入'
            })}
            rules={[
              {
                required: false,
                message: (
                  <FormattedMessage id="enum.form.validate.required" defaultMessage="请输入手机号码！" />
                ),
              },
            ]}
          />
        </Row>
        <Row>
          <ProFormText
            name="email"
            label={intl.formatMessage({
              id: 'system.user.email',
              defaultMessage: '邮箱',
            })}
            width="xl"
            placeholder={intl.formatMessage({id: 'enum.placeholder.input',
              defaultMessage: '请输入'
            })}
            rules={[
              {
                type: 'email',
                message: <FormattedMessage id="profile.baseInfo.email" defaultMessage="无效的邮箱地址！" />,
              },
              {
                required: false,
                message: <FormattedMessage id="enum.form.validate.required" defaultMessage="请输入邮箱！" />,
              },
            ]}
          />
        </Row>
        <Row>
          <ProFormRadio.Group
            options={[
              {
                label: intl.formatMessage({
                  id: 'profile.center.gender.male',
                  defaultMessage: '男',
                }),
                value: '0',
              },
              {
                label: intl.formatMessage({
                  id: 'profile.center.gender.female',
                  defaultMessage: '女',
                }),
                value: '1',
              },
            ]}
            name="sex"
            label={intl.formatMessage({
              id: 'system.user.sex',
              defaultMessage: '性别',
            })}
            width="xl"
            rules={[
              {
                required: false,
                message: <FormattedMessage id="enum.form.validate.required" defaultMessage="请输入性别！" />,
              },
            ]}
          />
        </Row>
      </ProForm>
    </>
  );
};

export default BaseInfo;
