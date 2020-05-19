<template>
    <div id="home">
        <!--头部-->
        <t-header></t-header>
        <!-- 面板主体 -->
        <main>
            <!-- 标题看板 -->
            <h2>
                <span class="icon icon-board"></span>我的看板
            </h2>
            <ul class="board-items">
                <!-- 面板 -->
                <router-link
                    v-for="board of boards"
                    :key="board.id"
                    class="board-item"
                    tag="li"
                    :to="{name: 'Board', params: {id: board.id}}"
                >
                    <span class="title">{{board.name}}</span>
                </router-link>
                <!-- 创建新看板 -->
                <li  class="board-item create-new-board">
                    <textarea 
                        class="title form-field-input" 
                        placeholder="创建新看板" 
                        ref="newBoardName" 
                        @blur="addBoard"
                    ></textarea>
                </li>
            </ul>
        </main>
    </div>
</template>

<script>
    import THeader from "@/components/THeader";
    import { mapState } from 'vuex';

    export default {
        name: 'Home',
        components: {
            THeader
        },
        computed: {
            ...mapState('board', {
                boards: state => state.boards
            })
        },
        mounted() {
            this.$store.dispatch('board/getBoards');
        },
        methods: {
            addBoard() {
                let { value } = this.$refs.newBoardName;
                // 不为空时创建面板
                if (value.trim()) {
                    try {
                        this.$store.dispatch('board/addBoard', {
                            name: value
                        });
                        this.$message.success('面板创建成功');
                        this.$refs.newBoardName.value = '';
                    } catch (error) {}
                }
            }
        }
    }
</script>