import * as api from '@/api';

export default {
    namespaced: true,
    state: {
        boards: null
    },
    getters: {
        // 获取面板
        getBoard: ({
            boards
        }) => id => Array.isArray(boards) ? boards.find(board => board.id == id) : null
    },
    mutations: {
        // 获取所有面板
        updateBoards: (state, data) => {
            state.boards = data;
            state.inited = true;
        },
        // 添加面板
        addBoard: (state, data) => {
            if (state.boards === null) {
                state.boards = [];
            };
            state.boards = [...state.boards, data];
        }
    },
    actions: {
        getBoards: async ({
            commit
        }) => {
            try {
                let res = await api.getBoards();
                commit('updateBoards', res.data);
                return res;
            } catch (error) {
                throw error;
            };
        },
        // 获取单个面板
        getBoard: async ({
            commit
        }, id) => {
            try {
                let res = await api.getBoard(id);
                commit('addBoard', res.data);
                return res;
            } catch (error) {
                throw error;
            };
        },
        // 添加面板
        addBoard: async ({
            commit
        }, data) => {
            try {
                let res = await api.addBoard(data);
                commit('addBoard', res.data);
                return res;
            } catch (error) {
                throw error;
            };
        }
    }
}