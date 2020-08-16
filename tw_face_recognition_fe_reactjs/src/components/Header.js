import React from 'react';
import '../App.css';
import './Header.css';
import {Button, Form, Input} from 'antd';

function Header() {

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 6},
    };

    const validateMessages = {
        required: 'This field is required!',
        types: {
            email: 'Not a validate email!',
            number: 'Not a validate number!',
            text: 'Not a validate name!',
        },
    };

    const onFinish = values => {
        console.log(values);
    };

    return (

        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="TWer Name" rules={[{type:'string',required: true}]}>
                <Input/>
            </Form.Item>

            <Form.Item name={['user', 'ID']} label="TWer ID" rules={[{type: 'number',required: true}]}>
                <Input/>
            </Form.Item>

            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>



    );
}

export default Header;