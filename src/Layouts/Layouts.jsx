import React, { lazy, useState } from "react";
import {
  DesktopOutlined,
  UserOutlined,
  PoweroffOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Dropdown, Avatar } from "antd";
import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { Styles } from "../Utils/ThemeCustomization";
import logo from "../Assets/Images/logo.png";
import { BellOutlined, MailOutlined, MoreOutlined } from "@ant-design/icons";
import Cookies from "../Utils/Cookies";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const menu = [
  getItem(<Link to="/">Dashboard</Link>, "1", <DesktopOutlined />),
  getItem(<Link to={"/crud"}>Crud</Link>, "2", <UserOutlined />),
];

const MobileMenu = lazy(() => import("../Layouts/MobileMenu"));

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorPrimary, colorBgContainer, borderColor, colorBg },
  } = theme.useToken();
  const logout = () => {
    Cookies.remove("admin_token");
    Cookies.remove("is_admin");
    Cookies.remove("admin");
    Cookies.remove("admin_id");
    window.location.href = "/login";
  };
  const items = [
    {
      label: "My Profile",
      key: "0",
      icon: <UserOutlined />,
    },
    {
      label: "Change Password",
      key: "1",
      icon: <SafetyCertificateOutlined />,
    },
    {
      label: <div onClick={logout}>Logout</div>,
      key: "3",
      icon: <PoweroffOutlined />,
    },
  ];

  return (
    <LayoutSection>
      <Layout
        style={{
          minHeight: "100vh",
        }}
        theme="light"
      >
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            height: "60px",
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <div className="header_align">
            <div className="header_left">
              <div className="mobile_menu">
                <MobileMenu menu={menu} />
              </div>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="header_right">
              <div className="menu_list">
                <div className="items_badges">
                  <BellOutlined />
                  <span className="badge_count blue">5</span>
                </div>
                <div className="items_badges">
                  <MailOutlined />
                  <span className="badge_count red">5</span>
                </div>
                <div className="my_details">
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Avatar size={30} icon={<UserOutlined />} />{" "}
                      <MoreOutlined />
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </Header>

        <Layout style={{ marginTop: 60, backgroundColor: colorPrimary }}>
          <Sider
            collapsible={true}
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
              backgroundColor: colorBgContainer,
            }}
            className="desktop_menu"
          >
            <Menu
              items={menu}
              mode="inline"
              defaultSelectedKeys={["1"]}
              theme="light"
              style={{ height: "100%", position: "sticky", top: 60 }}
              size="large"
            />
          </Sider>
          <Layout style={{ backgroundColor: colorBg }}>
            <Content
              style={{
                padding: "20px 16px",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </LayoutSection>
  );
};
export default Layouts;

const LayoutSection = styled.section`
  .ant-layout .ant-layout-sider-trigger {
    background: ${Styles.colorPrimary};
    line-height: 38px;
    height: 38px;
  }

  .header_align {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;
  }
  .header_left {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .header_left img {
    height: 32px;
  }
  .header_right {
    width: fit-content;
    display: inline-block;
  }

  .menu_list {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .items_badges .anticon svg {
    color: ${Styles.gray};
    font-size: 21px;
    position: relative;
  }

  .items_badges {
    position: relative;
    display: flex;
  }

  .items_badges .badge_count {
    height: 15px;
    width: 15px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -5px;
    right: -6px;
    color: #fff;
    font-size: 11px;
    font-family: ${Styles.fontFamily};
  }

  .items_badges .badge_count.blue {
    background: ${Styles.colorPrimary};
  }

  .items_badges .badge_count.red {
    background: ${Styles.colorError};
  }
  .my_details {
    display: flex;
  }
  a.ant-dropdown-trigger {
    display: flex;
  }
  .ant-dropdown-menu-title-content {
    font-size: 15px;
    color: ${Styles.gray};
  }
  .mobile_menu {
    display: none;
  }
  .ant-dropdown-trigger span.anticon.anticon-more svg {
    color: ${Styles.gray};
  }
  @media screen and (max-width: 1200px) {
    .desktop_menu {
      display: none;
    }
    .mobile_menu {
      display: block;
    }
  }

  @media screen and (max-width: 380px) {
    .header_left {
      gap: 10px;
    }
    .menu_list {
      gap: 15px;
    }
  }
`;
