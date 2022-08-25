import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signup } from "../utils";

class SignupForm extends React.Component {
  state = {
    displayModal: false, // 自己定义的state
  };

  // class based component, 箭头函数前不需要加const，如果是function based就要加const修饰
  handleCancel = () => { // 点了cancel，把popup modal关掉
    this.setState({
      displayModal: false,
    });
  };

  signupOnClick = () => { // 点了signup button 会弹出modal
    this.setState({
      displayModal: true,
    });
  };

  onFinish = (data) => { // 输入完用户名和密码，点击提交的时候
    signup(data)
      .then(() => { // signup返回一个promise
        this.setState({
          displayModal: false,
        });
        message.success('Successfully signed up'); // ` ` ' ' 没有区别
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  render = () => {
    return (
      <React.Fragment> 
        <Button shape="round" type="primary" onClick={this.signupOnClick}>
          Register
        </Button>
        <Modal
          title="Register"
          visible={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            preserve={false}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="firstname" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input placeholder="lastname" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </React.Fragment>
    );
  };
}

export default SignupForm;