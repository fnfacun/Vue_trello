import * as api from '@/api';

export default {
    namespaced: true,
    state: {
        lists: []
    },
    getters: {
        getLists: ({
            lists
        }) => boardId => lists.filter(list => list.boardId == boardId),

        getList: ({
            lists
        }) => listId => lists.find(list => list.id == listId)
    },
    mutations: {
        updateLists: (state, datas) => {
            state.lists = [...state.lists, ...datas];
        },
        addList: (state, data) => {
            state.lists = [...state.lists, data];
        },
        updateList: (state, data) => {
            state.lists = state.lists.map(list => {
                if (list.id === data.id) {
                    return {
                        ...list,
                        ...data
                    };
                };
                return list;
            });
        }
    },
    actions: {
        // 获取全部列表
        getLists: async ({
            commit
        }, boardId) => {
            try {
                let res = await api.getLists(boardId);
                commit('updateLists', res.data);
                return res;
            } catch (error) {
                throw error;
            }
        },
        // 添加列表
        addList: async ({
            commit
        }, data) => {
            try {
                let res = await api.addList(data);
                commit('addList', res.data);
                return res;
            } catch (error) {
                throw error;
            }
        },
        // 编辑列表
        editList: async ({
            commit
        }, data) => {
            try {
                let res = await api.editList(data);
                commit('updateList', data);
                return res;
            } catch (error) {
                throw error;
            };
        }
    }
}