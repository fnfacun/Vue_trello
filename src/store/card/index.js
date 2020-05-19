import * as api from '@/api';

export default {
    namespaced: true,
    state: {
        cards: []
    },
    getters: {
        // 获取所有卡片
        getCards: ({
            cards
        }) => boardListId => cards.filter(card => card.boardListId == boardListId),
        // 获取单个卡片
        getCard: ({
            cards
        }) => cardId => cards.find(card => card.id == cardId)
    },
    mutations: {
        // 获取所有卡片
        updateCards: (state, datas) => {
            state.cards = [...state.cards, ...datas];
        },
        // 添加单个卡片
        addCard: (state, data) => {
            state.cards = [...state.cards, data];
        },
        // 修改单个卡片信息
        updateCard: (state, data) => {
            state.cards = state.cards.map(card => {
                if (card.id === data.id) {
                    return {
                        ...card,
                        ...data
                    };
                }
                return card;
            });
        },
        // 添加附件
        addAttachment: (state, data) => {
            state.cards = state.cards.map(card => {
                if (card.id == data.boardListCardId) {
                    return {
                        ...card,
                        attachments: [...card.attachments, data]
                    }
                }
                return card;
            });
        },
        // 删除附件
        removeAttachment: (state, data) => {
            state.cards = state.cards.map(card => {
                if (card.id == data.cardId) {
                    return {
                        ...card,
                        attachments: card.attachments.filter(attachment => attachment.id != data.id)
                    }
                }
                return card;
            });
        },
        // 设置封面
        setCover: (state, data) => {
            state.cards = state.cards.map(card => {
                if (card.id == data.cardId) {
                    return {
                        ...card,
                        attachments: card.attachments.map(attachment => {
                            return {
                                ...attachment,
                                isCover: attachment.id == data.id
                            }
                        })
                    }
                }
                return card;
            });
        },
        // 移除封面
        removeCover: (state, data) => {
            state.cards = state.cards.map(card => {
                if (card.id == data.cardId) {
                    return {
                        ...card,
                        attachments: card.attachments.map(attachment => {
                            return {
                                ...attachment,
                                isCover: false
                            }
                        })
                    }
                }
                return card;
            });
        }
    },
    actions: {
        // 获取所有卡片
        getCards: async ({
            commit
        }, boardListId) => {
            try {
                let res = await api.getCards(boardListId);
                commit('updateCards', res.data);
                return res;
            } catch (error) {
                throw error;
            }
        },
        // 添加卡片
        addCard: async ({
            commit
        }, data) => {
            try {
                let res = await api.addCard(data);
                commit('addCard', res.data);
                return res;
            } catch (error) {
                throw error;
            }
        },
        // 编辑卡片
        editCard: async ({
            commit
        }, data) => {
            try {
                let res = await api.editCard(data);
                commit('updateCard', data);
                return res;
            } catch (error) {
                throw error;
            }
        },
        // 上传附件
        uploadAttachment: async ({
            commit
        }, data) => {
            try {
                let res = await api.uploadAttachment(data);
                commit('addAttachment', res.data);
                return res;
            } catch (error) {
                throw error;
            }
        },
        // 移除附件
        removeAttachment: async ({
            commit
        }, data) => {
            try {
                let res = await api.removeAttachment(data);
                commit('removeAttachment', data);
                return res;
            } catch (error) {
                throw error;
            };
        },
        // 设置封面
        setCover: async ({
            commit
        }, data) => {
            try {
                let res = await api.setCover(data);
                commit('setCover', data);
                return res;
            } catch (error) {
                throw error;
            };
        },
        // 移除封面
        removeCover: async ({
            commit
        }, data) => {
            try {
                let res = await api.removeCover(data);
                commit('removeCover', data);
                return res;
            } catch (error) {
                throw error;
            };
        }
    }
}