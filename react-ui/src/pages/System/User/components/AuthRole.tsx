import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from "@umijs/max";
import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export type FormValueType = any & Partial<API.System.Dept>;

export type AuthRoleFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    open: boolean;
    roleIds: number[];
    roles: string[];
    userId?:number|undefined;
};

const AuthRoleForm: React.FC<AuthRoleFormProps> = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        form.setFieldValue( 'roleIds', props.roleIds);
    });

    const intl = useIntl();
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
    const handleFinish = async (values: Record<string, any>) => {
        (values as FormValueType).userId = props.userId
        props.onSubmit(values as FormValueType);
    };

    return (
        <Modal
            width={640}
            title={intl.formatMessage({
                id: 'system.user.auth.role',
                defaultMessage: '分配角色',
            })}
            open={props.open}
            destroyOnClose
            forceRender
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <ProForm
                form={form}
                grid={true}
                layout="horizontal"
                onFinish={handleFinish}
                submitter={false}
                initialValues={{
                    login_password: '',
                    confirm_password: '',
                }}
            >
                <ProFormSelect
                    name="roleIds"
                    mode="multiple"
                    label={intl.formatMessage({
                        id: 'system.user.role',
                        defaultMessage: '角色',
                    })}
                    options={props.roles}
                    placeholder={intl.formatMessage({
                      id: 'enum.placeholder.select',
                      defaultMessage: '请选择'
                    })}
                    rules={[{ required: true, message: <FormattedMessage id="enum.form.validate.required" defaultMessage="请选择" /> }]}
                />
            </ProForm>
        </Modal>
    );
};

export default AuthRoleForm;
