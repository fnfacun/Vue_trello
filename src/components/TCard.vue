<template>
    <router-link :to="{name: 'Card', params:{listId: data.boardListId, cardId: data.id}}" class="list-card" v-if="data">
        <!-- 封面 -->
        <div 
            v-if="data.coverPath" 
            class="list-card-cover"
            :style="'background-image: url('+ 'http://localhost:8080' + data.coverPath +');'"
        ></div>
        <!-- 卡片名称 -->
        <div class="list-card-title">{{data.name}}</div>
        <!-- 卡片简介 -->
        <div class="list-card-badges">
            <div class="badge" v-if="data.description">
                <span class="icon icon-description"></span>
            </div>
            <!-- 卡片评论总数 -->
            <div class="badge" v-if="data.commentCount">
                <span class="icon icon-comment"></span>
                <span class="text">{{data.commentCount}}</span>
            </div>
            <!-- 卡片附件总数 -->
            <div class="badge" v-if="Array.isArray(data.attachments) && data.attachments.length > 0">
                <span class="icon icon-attachment"></span>
                <span class="text">{{data.attachments.length}}</span>
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'TCard',
        props: {
            data: {
                type: Object
            }
        }
    }
</script>