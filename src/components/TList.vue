<template>
    <div class="list-wrap list-wrap-content" :class="{'list-adding': listAdding}" :data-order="data.order">
        <div class="list-placeholder" ref="listPlaceholder"></div>
        <div class="list" ref="list">
            <!-- 列表头部 -->
            <div class="list-header" ref="listHeader">
                <textarea 
                    class="form-field-input" 
                    ref="newBoardListName" 
                    @mousedown.prevent 
                    @blur="editListName"
                >{{data.name}}</textarea>
                <div class="extras-menu" @mousedown.prevent>
                    <span class="icon icon-more"></span>
                </div>
            </div>
            <div class="list-cards">
                <!-- 卡片组件 -->
                <t-card v-for="card of cards" :data="card" :key="card.id"></t-card>
                <!-- 添加列表 -->
                <div class="list-card-add-form">
                    <textarea class="form-field-input" placeholder="为这张卡片添加标题……" ref="newListName"></textarea>
                </div>

            </div>
            <!-- 添加卡片 -->
            <div class="list-footer">
                <div class="list-card-add" @click="showListCardAddForm">
                    <span class="icon icon-add"></span>
                    <span>添加另一张卡片</span>
                </div>
                <div class="list-add-confirm">
                    <button class="btn btn-success" @click="addNewCard">添加卡片</button>
                    <span class="icon icon-close" @click="hideListCardAddForm"></span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import TCard from '@/components/TCard';
    export default {
        name: 'TList',
        components: {
            TCard,
        },
        props: {
            data: {
                type: Object
            }
        },
        data() {
            return {
                drag: {
                    isDown: false,
                    isDrag: false,
                    downClientX: 0,
                    downClientY: 0,
                    downElementX: 0,
                    downElementY: 0
                },
                listAdding: false
            }
        },
        computed: {
            cards() {
                return this.$store.getters['card/getCards'](this.data.id);
            }
        },
        async created() {
            if (!this.cards.length) {
                await this.$store.dispatch('card/getCards', this.data.id);
            }
        },
        mounted() {
            this.$refs.listHeader.addEventListener('mousedown', this.dragDown);
            document.addEventListener('mousemove', this.dragMove);
            document.addEventListener('mouseup', this.dragUp);
        },
        methods: {
            // 拖拽按下
            dragDown(e) {
                this.drag.isDown = true;
                this.drag.downClientX = e.clientX;
                this.drag.downClientY = e.clientY;
                let pos = this.$refs.list.getBoundingClientRect();
                this.drag.downElementX = pos.x;
                this.drag.downElementY = pos.y;
            },
            // 拖拽移动
            dragMove(e) {
                if (this.drag.isDown) {
                    let listElement = this.$refs.list;
                    let x = e.clientX - this.drag.downClientX;
                    let y = e.clientY - this.drag.downClientY;
                    // 拖动大于10像素触发拖拽
                    if (x > 10 || y > 10) {
                        if (!this.drag.isDrag) {
                            this.drag.isDrag = true;
                            // 卡片列表背景
                            this.$refs.listPlaceholder.style.height = listElement.offsetHeight + 'px';
                            // 卡片列表样式
                            listElement.style.position = 'absolute';
                            listElement.style.zIndex = 99999;
                            listElement.style.transform = 'rotate(5deg)';
                            document.body.appendChild(listElement);
                            this.$emit('dragStart', {
                                component: this
                            });
                        };
                        // 移动元素
                        listElement.style.left = this.drag.downElementX + x + 'px';
                        listElement.style.top = this.drag.downElementY + y + 'px';
                        this.$emit('dragMove', {
                            component: this,
                            x: e.clientX,
                            y: e.clientY
                        });
                    };
                };
            },
            // 拖拽抬起
            dragUp(e) {
                if (this.drag.isDown) {
                    // 判断是否拖拽，不是拖拽则触发表单组件
                    if (this.drag.isDrag) {
                        let listElement = this.$refs.list;
                        // 还原样式
                        this.$refs.listPlaceholder.style.height = 0;
                        listElement.style.position = 'relative';
                        listElement.style.zIndex = 0;
                        listElement.style.left = 0;
                        listElement.style.top = 0;
                        listElement.style.transform = 'rotate(0deg)';
                        this.$el.appendChild(listElement);
                        this.$emit('dragEnd', {
                            component: this
                        });
                    } else {
                        // 触发表单组件
                        if (e.path.includes(this.$refs.newBoardListName)) {
                            this.$refs.newBoardListName.select();
                        };
                    };
                    this.drag.isDown = this.drag.isDrag = false;
                };
            },
            // 编辑列表名称
            async editListName() {
                let { value, innerHTML } = this.$refs.newBoardListName;
                if (value !== innerHTML) {
                    await this.$store.dispatch('list/editList', {
                        boardId: this.data.boardId,
                        id: this.data.id,
                        name: value
                    })
                }
            },
            // 添加列表
            showListCardAddForm() {
                this.listAdding = true;
                this.$nextTick(() => {
                    this.$refs.newListName.focus();
                });
            },
            // 隐藏添加列表
            hideListCardAddForm() {
                this.listAdding = false;
                this.$refs.newListName.value = '';
            },
            addNewCard() {
                let { value } = this.$refs.newListName;
                if (value.trim()) {
                    try {
                        this.$store.dispatch('card/addCard', {
                            boardListId: this.data.id,
                            name: value
                        });
                        this.$message.success('添加成功');
                        this.listAdding = false;
                    } catch (e) {}
                } else {
                    this.$refs.newListName.focus();
                }
            }
        }
    }
</script>