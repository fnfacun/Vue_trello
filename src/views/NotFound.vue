<template>
    <div id="notFound">
        <!--头部-->
        <header>
            <div class="left">
                <a href="" class="btn btn-icon">
                    <i class="icon icon-home"></i>
                </a>
                <a href="" class="btn btn-icon">
                    <i class="icon icon-board"></i>
                    <span class="txt">看板</span>
                </a>
            </div>
            <a href="/" class="logo"></a>
            <div class="right">
                <a href="" class="btn btn-icon">
                    <i class="icon icon-add"></i>
                </a>
                <button class="avatar">
                    <span>无</span>
                </button>
            </div>
        </header>
        <!-- 主体 -->
        <main>
            <h1>页面不存在.</h1>
            <div>
                <router-link :to="{name: 'Register'}">注册</router-link> | <router-link :to="{name: 'Login'}">登录</router-link>
            </div>
        </main>
    </div>
</template>