import * as api from '@/api';

export default {
    namespaced: true,
    state: {
        info: null
    },
    mutations: {
        // 初始化用户信息
        initUserInfo: state => {
            try {
                let data = JSON.parse(localStorage.getItem('user'));
                state.info = data;
            } catch (e) {}
        },
        // 更新用户信息
        updateUserInfo: (state, data) => {
            state.info = data;
            localStorage.setItem('user', JSON.stringify(data));
        },
        // 删除用户信息
        removeUserInfo: (state, data) => {
            localStorage.removeItem('user');
        }
    },
    actions: {
        // 注册
        register: ({}, data) => {
            return api.register(data);
        },
        // 登录
        login: async ({
            commit
        }, data) => {
            try {
                let rs = await api.login(data);
                commit('updateUserInfo', {
                    id: rs.data.id,
                    name: rs.data.name,
                    authorization: rs.headers.authorization
                });
                return rs;
            } catch (error) {
                throw error;
            }
        },
        // 登出
        logout: async ({
            commit
        }) => {
            commit('removeUserInfo');
        }
    }
}