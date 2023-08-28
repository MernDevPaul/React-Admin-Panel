import React from "react";
import { styled } from "styled-components";
import { Styles } from "../../Utils/ThemeCustomization";
import bg_login from "../../Assets/Images/login.png";
import logo from "../../Assets/Images/logo.png";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import { start, success, failure } from "../../Store/Slice/AuthSlice";
import {
  FormButton,
  FormInput,
  FormInputPassword,
} from "../../Helpers/Helpers";
import { Navigate } from "react-router-dom";
import API from "../../Utils/ApiService";
import Cookies from "../../Utils/Cookies";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
const Login = () => {
  const api = new API();
  const dispatch = useDispatch();
  const isAdmin = Cookies.get("is_admin");
  const adminToken = Cookies.get("admin_token");

  if (isAdmin && adminToken) {
    return <Navigate to="/" />;
  }
  const loginHandler = (values) => {
    api.create(dispatch, [start, success, failure,"login"], "login", values, (err,res) => {
      console.log("err", err);
      console.log("res", res?.data?.token);
      if (res) {
        Cookies.set("admin_token", res?.data?.token);
        Cookies.set("is_admin", res?.data?.success);
        Cookies.set("admin_id", res?.data?.data?._id);
        Cookies.set("admin", JSON.stringify(res?.data?.data));
        window.location.href = "/";
      } else {
        Cookies.remove("admin_token");
        Cookies.remove("is_admin");
        Cookies.remove("admin_id");
        Cookies.remove("admin");
      }
    });
  }
  return (
    <LoginSection>
      <div className="login_section">
        <div className="login_header">
          <div className="login_header_align">
            <div className="login_header_left">
              <img src={logo} alt="Logo" />
            </div>
            <div className="login_header_right">
              <FormButton
                btype="button"
                text="Sign Up"
                type="primary"
                loading={false}
              />
            </div>
          </div>
        </div>
        <div className="login_form col_1 g_20">
          <h1 className="h1 t_a_c">Welcome back!</h1>
          <Form
            layout="vertical"
            onFinish={(e) => loginHandler(e)}
            className="col_1 g_10"
          >
            <FormInput
              label="Phone Number"
              name="phone"
              placeholder="Phone Number"
              required={true}
              validationmsg="Please enter valid phone number"
              icon={<UserOutlined />}
            />
            <FormInputPassword
              label="Password"
              name="password"
              placeholder="Password"
              required={true}
              validationmsg="Please enter password"
              icon={<LockOutlined />}
            />
            <div className="m_t_5"></div>
            <FormButton
              btype="submit"
              text="Sign In"
              type="primary"
              loading={false}
              icon={<LoginOutlined />}
            />
          </Form>
        </div>
      </div>
    </LoginSection>
  );
};

export default Login;

const LoginSection = styled.section`
  position: relative;
  display: flex;
  .login_header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 40;
    padding: 20px 25px;
    width: 100%;
  }
  .login_header_align {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
  .login_header_left {
    width: fit-content;
  }
  .login_header_left img {
    height: 42px;
  }
  .login_header_right {
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 15px;
  }
  .login_section {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .login_section::after {
    content: "";
    position: absolute;
    top: 25vh;
    width: calc(100%);
    height: calc(100% - 25vh);
    width: 100%;
    left: 0;
    background: url(${bg_login}) no-repeat;
    background-size: 100%;
    z-index: 15;
    height: 100%;
    width: 100%;
  }
  .login_section::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    top: 25vh;
    height: 100%;
    background: ${Styles.colorPrimary};
    z-index: 10;
  }
  .login_form {
    position: relative;
    z-index: 30;
    width: 390px;
    padding: 30px 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 24px 64px #26214a1a;
    border: 1px solid ${Styles.borderColor};
  }

  @media screen and (max-width: 480px) {
    .login_form {
      width: 85%;
    }
    .login_section::after {
      top: 35%;
      height: calc(100% - 35vh);
    }
    .login_section::before {
      top: 35%;
    }
  }
`;
