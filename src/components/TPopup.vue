<template>
    <div class="popup-container">
        <div @click="open">
            <slot></slot>
        </div>
        <!-- 弹窗头部 -->
        <div class="popup" v-show="isShow" ref="popup">
            <div class="popup-header">
                <span class="popup-title">{{title}}</span>
                <a class="popup-header-close" @click="close" ref="close">
                    <i class="icon icon-close"></i>
                </a>
            </div>
            <!-- 弹窗主题内容 -->
            <div class="popup-content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TPopup',
        props: {
            title: {
                type: String,
                default: '菜单'
            }
        },
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            // 显示弹窗
            open() {
                // 显示
                this.isShow = true;
                let popup = this.$refs.popup;
                window.addEventListener('click', this.close);
                this.$nextTick(() => {
                    let popupRect = popup.getBoundingClientRect();
                    let left = 0;
                    // 元素超过屏幕宽度
                    if (popupRect.right > window.innerWidth) {
                        popup.style.left = -popupRect.width + this.$el.offsetWidth + 'px';
                    }
                });
                this.$emit('open');
            },
            // 关闭
            close(e) {
                if (!e || e.path.includes( this.$refs.close ) || !e.path.includes(this.$el)) {
                    this.isShow = false;
                    this.$emit('close');
                    window.removeEventListener('click', this.close);
                };
            }
        }
    }
</script>