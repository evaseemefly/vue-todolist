<template>
    <div id="toolbar" class="btn-toolbar" role="toolbar">
        <div class="btn-group" role="group">
            <button id="btn_add" type="button" class="btn btn-primary" @click="add_row">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
            </button>
            <button id="btn_delete" type="button" class="btn btn-danger" @click="del_row">
                <span class="glyphicon glyphicon-remove" aria-hidden="true" ></span>删除
            </button>
            <button id="btn_delete" type="button" class="btn btn-danger" @click="init_targetMonthTable">
                <span class="glyphicon glyphicon-remove" aria-hidden="true" ></span>初始化
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            add_row() {
                /*
                    新增时向tb后面追加一行
                    思路：
                        点击时调用父类中的方法，向table最后一行追加一行
                */
               // alert('新增');
                this.$emit('add_row');
            },
            del_row(){

                //删除当前选中行
                alert('删除');
            },
            init_targetMonthTable(){
                //生成新的一个月的表
                alert('初始化');
            }
        }
    }
</script>

<style>
</style>
