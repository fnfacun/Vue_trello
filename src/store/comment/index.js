import * as api from '@/api'

export default {
    namespaced: true,
    actions: {
        // 获取评论总数
        getComments: async ({}, params) => {
            return api.getComments(params);
        },
        // 添加评论
        addComment: async ({}, data) => {
            return api.addComment(data);
        }
    }
}