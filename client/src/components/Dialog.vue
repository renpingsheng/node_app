<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body='false'>
            <div class="form">
                <el-form :model="formData" status-icon :rules="form_rules" ref="form" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="收支类型">
                        <el-select v-model="formData.type" placeholder="收支类型">
                            <el-option v-for="(formtype, index) in format_type_list" :key="index" :label="formtype" :value="formtype"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="收支描述：" prop="describe">
                        <el-input type="describe" v-model="formData.describe"></el-input>
                    </el-form-item>

                    <el-form-item prop='income' label="收入:">
                        <el-input type="income" v-model="formData.income"></el-input>
                    </el-form-item>

                    <el-form-item prop='expend' label="支出:">
                        <el-input type="expend" v-model="formData.expend"></el-input>
                    </el-form-item>

                    <el-form-item prop='cash' label="账户现金:">
                        <el-input type="cash" v-model="formData.cash"></el-input>
                    </el-form-item>

                    <el-form-item label="备注:">
                        <el-input type="textarea" v-model="formData.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show = false">取消</el-button>
                        <!--这里的form需要和前面的el-form元素的ref参数保持一致-->
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'dialog',
        //为html元素里需要使用的属性？？
        data() {
            return {
                // 给下拉列表填充值的属性
                format_type_list: [
                    "提现",
                    "提现手续费",
                    "充值",
                    "优惠券",
                    "充值礼券",
                    "转账"
                ],
                form_rules: {
                    describe: [
                        {required: true, message: "收支描述不能为空！", trigger: "blur"}
                    ],
                    income: [
                        {required: true, message: "收入不能为空！", trigger: "blur"}
                    ],
                    expend: [
                        {required: true, message: "支出不能为空！", trigger: "blur"}
                    ],
                    cash: [{required: true, message: "账户现金不能为空！", trigger: "blur"}]
                }
            }
        },
        //props可以理解为输入参数？？
        props: {
            dialog: Object,
            formData: Object
        },
        methods: {
            onSubmit(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        const url = this.dialog.option == 'add' ? 'add' : `edit/${this.formData.id}`;
                        //表单数据验证完成之后，提交数据;
                        // 通过反引号进行变量替换
                        this.$axios.post(`api/profiles/${url}`, this.formData).then(res => {
                            //添加成功
                            this.$message({
                                message: "数据添加成功",
                                type: 'success'
                            });
                            //隐藏对话框
                            this.dialog.show = false;
                            // 通知Dialog的父级（FundList）刷新数据
                            this.$emit("update");
                        });
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>
