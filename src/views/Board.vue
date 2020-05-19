<template>
    <div id="board">
        <!--头部-->
        <t-header></t-header>
        <!--正文-->
        <main v-if="board">
            <!-- 面板标题 -->
            <h2>{{board.name}}</h2>
            <!--面板容器-->
            <div class="board">
                <!--面板列表容器-->
                <t-list 
                    v-for="list of lists" 
                    :key="list.id" 
                    :data="list" 
                    @dragStart="dragStart" 
                    @dragMove="dragMove"
                    @dragEnd="dragEnd"
                ></t-list>
                <!--无内容列表容器-->
                <div class="list-wrap no-content" :class="{'list-adding': listAdding}">
                    <!-- 添加另一个列表 -->
                    <div class="list-add" @click="showListAdding">
                        <span class="icon icon-add"></span>
                        <span>添加另一个列表</span>
                    </div>
                    <div class="list">
                        <!-- 为卡片添加标题 -->
                        <div class="list-cards">
                            <div class="list-card-add-form">
                                <input class="form-field-input" ref="newListName" placeholder="为这张卡片添加标题……" />
                            </div>
                        </div>
                        <!-- 添加列表 -->
                        <div class="list-footer">
                            <div class="list-add-confirm">
                                <button class="btn btn-success" @click="addNewList">添加列表</button>
                                <span class="icon icon-close" @click="hideListAdding"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- router -->
        <router-view></router-view>
    </div>
</template>


<script>
    import THeader from "@/components/THeader";
    import TList from '@/components/TList';

    export default {
        name: 'Board',
        components: {
            THeader,
            TList
        },
        data() {
            return {
                listAdding: false
            }
        },
        computed: {
            board() {
                return this.$store.getters['board/getBoard'](this.$route.params.id);
            },
            lists() {
                return this.$store.getters['list/getLists'](this.$route.params.id);
            }
        },
        created() {
            if (!this.board) {
                this.$store.dispatch('board/getBoard', this.$route.params.id);
            }
            if (!this.lists.length) {
                this.$store.dispatch('list/getLists', this.$route.params.id);
            }
        },
        methods: {
            // 显示添加列表
            showListAdding() {
                this.listAdding = true;
                this.$nextTick(() => {
                    this.$refs.newListName.focus();
                });
            },
            // 隐藏添加列表
            hideListAdding() {
                this.listAdding = false;
            },
            // 提交添加新的列表
            addNewList() {
                let { value } = this.$refs.newListName;
                if (!value.trim()) {
                    this.$refs.newListName.focus();
                } else {
                    try {
                        this.$store.dispatch('list/addList', {
                            boardId: this.board.id,
                            name: value
                        });
                        this.$message.success('提交成功');
                        this.$refs.newListName.value = '';
                        this.listAdding = true;
                    } catch (e) {}
                }
            },
            // 拖拽
            dragStart(e) {
                /**
                 * 获取列表中拖动元素的下标
                 */
                let el = e.component.$el;
                let board = el.parentNode;
                let lists = [...board.querySelectorAll('.list-wrap')];
                el._index = lists.findIndex(list => list === el);
            },
            // 移动
            dragMove(e) {
                let el = e.component.$el;
                let board = el.parentNode;
                let lists = [...board.querySelectorAll('.list-wrap')];
                // 找到当前拖动元素的下标
                let currentIndex = lists.findIndex(list => list === el);
                /**
                 * 如果当前拖动的元素的下标不等于其他元素下标，证明拖动了
                 * 如果鼠标拖动卡片超出卡片范围则视为交换位置，当前拖动元素的下标小于其他元素下标则表示插入到元素前面，否则保持不变
                 */
                lists.forEach((list, index) => {
                    if (index !== currentIndex) {
                        let clientRect = list.getBoundingClientRect();
                        if (
                            e.x >= clientRect.left &&
                            e.x <= clientRect.right &&
                            e.y >= clientRect.top &&
                            e.y <= clientRect.bottom
                        ) {
                            if (currentIndex < index) {
                                board.insertBefore(el, list.nextElementSibling);
                            } else {
                                board.insertBefore(el, list);
                            }
                        }
                    }
                });
            },
            // 拖拽抬起
            async dragEnd(e) {
                /**
                 * 如果按下的元素下标和当前拖动元素下标不一致，表示拖动了。
                 * 计算出order值，上一个的元素order和下一个元素的order和中间位的order差值
                 */
                let el = e.component.$el;
                let board = el.parentNode;
                let lists = [...board.querySelectorAll('.list-wrap-content')];
                let currentIndex = lists.findIndex(list => list === el);
                if (el._index !== currentIndex) {
                    let newOrder;
                    // 获取当前所在位置的上一个列表和下一个列表的order值
                    let prevOrder = lists[currentIndex - 1] && parseFloat(lists[currentIndex - 1].dataset.order);
                    let nextOrder = lists[currentIndex + 1] && parseFloat(lists[currentIndex + 1].dataset.order);
                    if (currentIndex === 0) {
                        newOrder = nextOrder / 2;
                    } else if (currentIndex === lists.length - 1) {
                        newOrder = prevOrder + 65535;
                    } else {
                        newOrder = prevOrder + (nextOrder - prevOrder) / 2;
                    };
                    await this.$store.dispatch('list/editList', {
                        boardId: this.board.id,
                        id: e.component.data.id,
                        order: newOrder
                    });
                }
            }
        }
    }
</script>