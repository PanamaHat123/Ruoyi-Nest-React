import {
  ClusterOutlined,
  MailOutlined,
  TeamOutlined,
  UserOutlined,
  MobileOutlined,
  ManOutlined,
} from '@ant-design/icons';
import { Card, Col, Divider, List, Row } from 'antd';
import React, { useState } from 'react';
import styles from './Center.less';
import BaseInfo from './components/BaseInfo';
import ResetPassword from './components/ResetPassword';
import AvatarCropper from './components/AvatarCropper';
import { useRequest } from '@umijs/max';
import { getUserInfo } from '@/services/session';
import { PageLoading } from '@ant-design/pro-components';
import { useIntl, FormattedMessage } from '@umijs/max';

const operationTabList = [
  {
    key: 'base',
    tab: (
      <span>
        <FormattedMessage id="profile.center.baseInfo" defaultMessage="基本资料" />
      </span>
    ),
  },
  {
    key: 'password',
    tab: (
      <span>
        <FormattedMessage id="profile.center.resetPassword" defaultMessage="重置密码" />
      </span>
    ),
  },
];

export type tabKeyType = 'base' | 'password';
const Center: React.FC = () => {
  const intl = useIntl()

  const [tabKey, setTabKey] = useState<tabKeyType>('base');

  const [cropperModalOpen, setCropperModalOpen] = useState<boolean>(false);

  //  获取用户信息
  const { data: userInfo, loading } = useRequest(async () => {
    return { data: await getUserInfo()};
  });
  if (loading) {
    return <div>loading...</div>;
  }

  const currentUser = userInfo?.user;

  //  渲染用户信息
  const renderUserInfo = ({
    userName,
    phonenumber,
    email,
    sex,
    dept,
  }: Partial<API.CurrentUser>) => {
    return (
      <List>
        <List.Item>
          <div>
            <UserOutlined
              style={{
                marginRight: 8,
              }}
            />
            <FormattedMessage id="profile.center.username" defaultMessage="用户名" />
          </div>
          <div>{userName}</div>
        </List.Item>
        <List.Item>
          <div>
            <ManOutlined
              style={{
                marginRight: 8,
              }}
            />
            <FormattedMessage id="profile.center.gender" defaultMessage="性别" />
          </div>
          <div>{sex === '1' ?
            <FormattedMessage id="profile.center.gender.male" defaultMessage="男" />
            : <FormattedMessage id="profile.center.gender.female" defaultMessage="女" />
          }</div>
        </List.Item>
        <List.Item>
          <div>
            <MobileOutlined
              style={{
                marginRight: 8,
              }}
            />
            <FormattedMessage id="profile.center.phone" defaultMessage="电话" />
          </div>
          <div>{phonenumber}</div>
        </List.Item>
        <List.Item>
          <div>
            <MailOutlined
              style={{
                marginRight: 8,
              }}
            />
            <FormattedMessage id="profile.center.email" defaultMessage="邮箱" />
          </div>
          <div>{email}</div>
        </List.Item>
        <List.Item>
          <div>
            <ClusterOutlined
              style={{
                marginRight: 8,
              }}
            />
            <FormattedMessage id="profile.center.department" defaultMessage="部门" />
          </div>
          <div>{dept?.deptName}</div>
        </List.Item>
      </List>
    );
  };

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'base') {
      return <BaseInfo values={currentUser} />;
    }
    if (tabValue === 'password') {
      return <ResetPassword />;
    }
    return null;
  };

  if (!currentUser) {
    return <PageLoading />;
  }

  return (
    <div>
      <Row gutter={[16, 24]} style={{marginTop:"10px"}}>
        <Col lg={7} md={24} >
          <Card
            title={intl.formatMessage({
              id: 'profile.center.title',
              defaultMessage: '个人信息',
            })}
            bordered={false}
            loading={loading}
            style={{marginLeft:"30px"}}
          >
            {!loading && (
              <div style={{ textAlign: "center"}}>
                <div className={styles.avatarHolder} onClick={()=>{setCropperModalOpen(true)}}>
                  <img alt="" src={currentUser.avatar} />
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>
                    <FormattedMessage id="profile.center.role" defaultMessage="角色" />
                  </div>
                  <Row gutter={36}>
                    {currentUser.roles &&
                      currentUser.roles.map((item: any) => (
                        <Col key={item.roleId} lg={24} xl={12}>
                          <TeamOutlined
                            style={{
                              marginRight: 8,
                            }}
                          />
                          {item.roleName}
                        </Col>
                      ))}
                  </Row>
                </div>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={16} md={24}>
          <Card
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
      <AvatarCropper
        onFinished={() => {
          setCropperModalOpen(false);
        }}
        open={cropperModalOpen}
        data={currentUser.avatar}
      />
    </div>
  );
};

export default Center;
