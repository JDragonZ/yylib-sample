var React = require('react');
var { YYClass,YYPage,YYForm,YYInput,YYCheckbox,YYButton,YYFormItem,YYPanel,YYDivide } = require('yylib-ui');
var FormDemo8=require('../components/FormDemo8')

var LoginForm = YYClass.create({
    handleSubmit: function (e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    },
    render: function() {
        var { getFieldProps } = this.props.form;
        return (
            <YYPage>
                <YYForm inline onSubmit={this.handleSubmit}>
                    <YYFormItem label="账户">
                        <YYInput placeholder="请输入账户名" {...getFieldProps('userName')}/>
                    </YYFormItem>
                    <YYFormItem label="密码">
                        <YYInput type="password" placeholder="请输入账户名" {...getFieldProps('password')}/>
                    </YYFormItem>
                    <YYFormItem>
                        <YYCheckbox {...getFieldProps('agreement')}>记住我</YYCheckbox>
                    </YYFormItem>
                    <YYButton type="primary">登陆</YYButton>
                </YYForm>
                <YYDivide></YYDivide>
                <FormDemo8/>
            </YYPage>
        )
    }
});

LoginForm = YYForm.create()(LoginForm);

module.exports = LoginForm;