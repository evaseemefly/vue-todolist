<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top navbar-inverse" style="margin-bottom: 0px;">
            <div class="navbar-header" id="my_navbar">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse">
                    <span class="sr-only">Toggle navigation</span>
                </button>
                <a class="navbar-brand" href="#">网站后台管理</a>

            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li v-for="(group,index) in groups" :class="index==group_index?'active':''">
                        <!-- <a href="#" @click="changeIndex(index)">{{group.department.derpartmentname}}
                            <span class="sr-only">(current)</span>
                        </a> -->
                        <router-link :to="{name:'content',path:'content',params:{did:group.department.did}}"
                            @click.native="changeIndex(index)"> {{group.department.derpartmentname}}
                            <span class="sr-only">(current)</span>
                        </router-link>
                        <!-- <router-link to="/home/content/4"
                            @click.native="changeIndex(index)"> {{group.department.derpartmentname}}
                            <span class="sr-only">(current)</span>
                        </router-link> -->
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">当前部门
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#"></a>
                            </li>                            
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{name}}&nbsp
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#" @click="logout">退出登录</a>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </nav>
    </div>

</template>

<script>
    import cookie from "../../common/js/cookie.js";
    export default {
        data() {
            return {
                name: "",
                token: "",
                group_index: 0
                //   groups:[]
            };
        },
        props: {
            groups: {
                required: true
            }
        },
        methods: {
            //登出
            logout() {
                /*
                    登出操作：
                    1、清除cookie中的name与token的value
                    2、跳转至login页面
                */
                //1、 删除指定cookie
                cookie.delCookie('name');
                cookie.delCookie('token');
                //2、跳转至login页面
                this.$router.push("/login");
            },
            //子组件将当前选中的值传递给父组件
            changeIndex: function (index) {
                // alert(index);
                //将当前index值传递给父组件
                this.group_index = index;
                //使用this.$emit除法父组件的事件
                this.$emit("changeIndex", index);
            },
            // changeParentIndex(index) {
            // }
        },
        //加载组件后从cookie中取出user以及token的值
        mounted: function () {
            this.name = cookie.getCookie("name");
            this.token = cookie.getCookie("token");
            console.log(this.name);
            console.log(this.token);
            // this.name = cookie.getCookie("name");
        }
    };
</script>

<style>
</style>