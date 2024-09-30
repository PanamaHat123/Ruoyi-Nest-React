import React, { useEffect } from 'react';
import { Modal, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Highlight from 'react-highlight';
import 'highlight.js/styles/base16/material.css';
import { history, FormattedMessage, useIntl } from "@umijs/max";

interface PreviewTableProps {
  open: boolean;
  data?: any;
  onHide: () => void;
}

const PreviewTableCode: React.FC<PreviewTableProps> = (props) => {
  const intl = useIntl();
  const panes: any = [];
  const keys = Object.keys(props.data);
  keys.forEach((key) => {
    panes.push({
        key: key + '1',
        label: key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm')),
        children: <Highlight className="java">{props.data[key]}</Highlight>,
      } as TabsProps);
  });

  useEffect(() => {}, []);

  return (
    <Modal
      width={900}
      title={intl.formatMessage({
        id: 'tool.gen.preview',
        defaultMessage: '预览',
      })}
      open={props.open}
      destroyOnClose
      footer={false}
      onOk={() => {
        props.onHide();
      }}
      onCancel={() => {
        props.onHide();
      }}
    >
      <Tabs defaultActiveKey="1" items={panes}></Tabs>
    </Modal>
  );
};

export default PreviewTableCode;
