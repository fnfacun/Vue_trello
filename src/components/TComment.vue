<template>
    <div>
        <div class="comment-post">
            <!-- 添加评论 -->
            <div class="avatar">
                <span>{{user.name[0].toUpperCase()}}</span>
            </div>
            <div class="comment-content-box editing">
                <textarea class="comment-content-input" placeholder="添加评论……" ref="content"></textarea>
                <button class="btn btn-edit" @click="addComment">保存</button>
            </div>
        </div>
        <!-- 下方评论 -->
        <ul class="comments" v-if="comments.rows">
            <li class="comment" v-for="comment of comments.rows" :key="comment.id">
                <div class="avatar">
                    <span>{{comment.user.name[0].toUpperCase()}}</span>
                </div>
                <div class="description">
                    <div class="header">
                        <strong>{{comment.user.name}}</strong>
                        <span> at </span>
                        <i>{{comment.createdAt|dateTime}}</i>
                    </div>
                    <div class="content">
                        {{comment.content}}
                    </div>
                </div>
            </li>
        </ul>
        <!-- 评论分页 -->
        <div class="comment-pagination">
            <t-pagination :pages="comments.pages" :page="comments.page" @changePage="changePage"></t-pagination>
        </div>
    </div>
</template>

<script>
    import dateTime from '@/filters/dateTime';
    import TPagination from "@/components/TPagination";

    export default {
        name: 'TComment',
        filters: {
            dateTime
        },
        components: {
            TPagination
        },
        props: {
            cardId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                comments: {}
            }
        },
        computed: {
            user() {
                return this.$store.state.user.info;
            }
        },
        async created() {
            await this.getComments();
        },
        methods: {
            // 获取评论总数
            async getComments(page = 1) {
                try {
                    let res = await this.$store.dispatch('comment/getComments', {
                        boardListCardId: this.cardId,
                        page
                    });
                    this.comments = res.data;
                } catch (error) {}
            },
            // 添加评论
            async addComment() {
                let { value } = this.$refs.content;
                try{
                    if (value.trim()) {
                        let rs = await this.$store.dispatch('comment/addComment', {
                            boardListCardId: this.cardId,
                            content: value
                        });
                        this.$message.success('评论成功');
                        await this.getComments();
                    }
                    this.$refs.content.value = '';
                    this.$refs.content.focus();
                } catch (error) {}
            },
            // 点击分页
            async changePage(page) {
                await this.getComments(page);
            }
        }
    }
</script>