import { lowercaseFirstLetter, uppercaseFirstLetter } from "../../utils";
import { GenTableColumnEntity } from "../../model/entity/GenTableCloumn.entity";
import { GenConstants } from "../../model/constant/GenConstants";

export const reactEditTem = (options) => {
  const { businessName, functionName, moduleName,className,columns,internationalize } = options;
  const lfclassName = lowercaseFirstLetter(className);
  const upperModuleName = uppercaseFirstLetter(moduleName);
  const primaryFiled = columns.find(filed => filed.isPk == "1");
  const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
  const i18n = internationalize == '1'
  return `

import React, { useEffect } from 'react';
import { Form, Modal} from 'antd';
import { useIntl, FormattedMessage } from '@umijs/max';
import { getDictValueEnum } from '@/services/system/dict';
import { ProForm,ProFormDigit,ProFormText,ProFormDateTimePicker,ProFormRadio, ProFormCheckbox, ProFormTextArea, ProFormSelect } from "@ant-design/pro-form";

export type ${className}FormData = Record<string, unknown> & Partial<API.${upperModuleName}.${className}>;

export type ${className}FormProps = {
  onCancel: (flag?: boolean, formVals?: ${className}FormData) => void;
  onSubmit: (values: ${className}FormData) => Promise<void>;
  open: boolean;
  values: Partial<API.${upperModuleName}.${className}>;
};

const ${className}Form: React.FC<${className}FormProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ${createFormValueAssign(columns)}
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
    props.onSubmit(values as ${className}FormData);
  };

  return (
    <Modal
      width={640}
      title={<FormattedMessage id={props.values["${primaryFiled.javaField}"]?'enum.form.edit_content':'enum.form.add_content'} defaultMessage="${functionName}" values={{content:"${functionName}"}}/>}
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
        ${createFormBody(columns)}
      </ProForm>
    </Modal>
  );
};

export default ${className}Form;

    `;

  function createFormValueAssign(cloumns:GenTableColumnEntity[]) {
    let str = ``;

    cloumns.forEach(item=>{
      str+=`
      ${item.javaField}: props.values.${item.javaField},`
    })

    return str;
  }

  function createFormBody(columns:GenTableColumnEntity[]) {

    let str = ``;

    columns.forEach((item,index)=>{

      if((item.isInsert != '1' && item.isEdit !='1') && item.isPk != '1'){
        return
      }
      if(item.htmlType==GenConstants.HTML_INPUT){
        if(item.javaType == 'number'){
          str+=`
        <ProFormDigit`
        }else{
          str+=`
        <ProFormText`
        }
      }
      else if (item.htmlType == GenConstants.HTML_DATETIME) {
        str += `
        <ProFormDateTimePicker`
      }
      else if(item.htmlType == GenConstants.HTML_RADIO){
        str += `
        <ProFormRadio.Group`
        if(item.dictType){
          str+=`
          request={async ()=> Object.values(await getDictValueEnum('${item.dictType}'))}`
        }else{
          str+=`
           options={[
            {
              label:'demoLabel',
              value:${item.javaType=='number'? 1 :'demoValue'}
            }
           ]}`
        }
      }
      else if(item.htmlType == GenConstants.HTML_SELECT){
        str += `
        <ProFormSelect`
        if(item.dictType){
          str+=`
          request={async ()=> Object.values(await getDictValueEnum('${item.dictType}'))}`
        }else{
          str+=`
           valueEnum={{
            '0':'label1',
            '1':'label2',
           }}`
          if(item.javaType=='number'){
            str+=`
           onChange={(value)=>+value}`
          }
        }
      }
      else if(item.htmlType == GenConstants.HTML_CHECKBOX){
        str += `
        <ProFormCheckbox.Group`
        if(item.dictType){
          str+=`
          request={async ()=> Object.values(await getDictValueEnum('${item.dictType}'))}`
        }else{
          str+=`
           options={[
            {
              label:'demoLabel',
              value:${item.javaType=='number'? 1 :'demoValue'}
            }
           ]}`
        }
      }
      else if(item.htmlType == GenConstants.HTML_TEXTAREA){
        str+=`
        <ProFormTextArea`
      }
      else{
        str+=`
        <ProFormText`
      }

      str+=`
          name="${item.javaField}"
          label=${createItemLabel(item)}${item.isPk == '1'?`
          disabled
          hidden={true}`:''}
          placeholder={intl.formatMessage({
            id: 'enum.placeholder.input',
            defaultMessage: '请输入'
          })}
          rules={[
            {
              required: ${item.isRequired == '1'},
              message: <FormattedMessage id="enum.form.validate.required_content" defaultMessage="${item.columnComment}必填" values={{content:"${item.columnComment}"}} />
            },${item.javaType!='number'?'':`
            {
              pattern: new RegExp(/^[0-9]*$/),
              message: <FormattedMessage id="enum.form.validate.number_content" defaultMessage="${item.columnComment}非数字" values={{content:"${item.columnComment}"}} />
            }`}
          ]}
        />
      `
    })

    return str;

  }

  function createItemLabel(item:GenTableColumnEntity) {
    if(!i18n){
      return `"${item.columnComment}"`
    }
    return `{<FormattedMessage id="${moduleName}.${lfclassName}.${item.columnName}" defaultMessage="${item.columnComment}" />}`
  }
};

