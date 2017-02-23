var React = require('react');
var { YYClass,YYPage,YYForm,YYInput,YYCheckbox,YYButton,YYFormItem,YYPanel } = require('yylib-ui');

function noop() {
    return false;
}

const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
};

var FormDemo8 = YYClass.create({
    handleSubmit: function (e) {
        e.preventDefault();
        this.props.form.validateFields(function (errors, values) {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    },
    handleReset: function (e) {
        e.preventDefault();
        this.props.form.resetFields();
    },
    userExists: function (rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    },
    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePasswd'], { force: true });
        }
        callback();
    },
    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('passwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    },
    render: function() {
        var { getFieldProps, isFieldValidating, getFieldError } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, min: 5, message: '用户名至少为 5 个字符' },
                { validator: this.userExists },
            ],
        });
        const emailProps = getFieldProps('email', {
            validate: [
                {
                    rules: [
                        { required: true },
                    ],
                    trigger: 'onBlur',
                }, {
                    rules: [
                        { type: 'email', message: '请输入正确的邮箱地址' },
                    ],
                    trigger: ['onBlur', 'onChange'],
                }],
        });
        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkPass },
            ],
        });
        const rePasswdProps = getFieldProps('rePasswd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass2,
            }],
        });
        const textareaProps = getFieldProps('textarea', {
            rules: [
                { required: true,min:5,max:300,message:'此备注当为5~300个字符'},
            ],
        });
        return (
            <YYPage>
                <YYForm horizontal>
                    <YYFormItem
                        {...formItemLayout}
                        label="用户名"
                        hasFeedback
                        help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
                        <YYInput {...nameProps} placeholder="实时校验，输入 JasonWood 看看" />
                    </YYFormItem>

                    <YYFormItem
                        {...formItemLayout}
                        label="邮箱"
                        hasFeedback>
                        <YYInput {...emailProps} type="email" placeholder="onBlur 与 onChange 相结合" />
                    </YYFormItem>

                    <YYFormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback>
                        <YYInput {...passwdProps} type="password" autoComplete="off"
                                 onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}/>
                    </YYFormItem>

                    <YYFormItem
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback>
                        <YYInput {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                                 onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}/>
                    </YYFormItem>

                    <YYFormItem
                        {...formItemLayout}
                        label="备注">
                        <YYInput {...textareaProps} type="textarea" id="textarea" name="textarea" placeholder = '此备注当为5~300个字符' />
                    </YYFormItem>

                    <YYFormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <YYButton type="primary" onClick={this.handleSubmit}>确定</YYButton>
                        &nbsp;&nbsp;&nbsp;
                        <YYButton type="ghost" onClick={this.handleReset}>重置</YYButton>
                    </YYFormItem>
                </YYForm>
            </YYPage>
        )
    }
});

FormDemo8 = YYForm.create()(FormDemo8);

module.exports = FormDemo8;