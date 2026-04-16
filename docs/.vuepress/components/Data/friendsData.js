// components/friendsData.js

export const friends = [
    // ========== 技术类 ==========
    {
        name: '暂无',
        url: '#',
        emoji: '#',
    },

]

// 导出辅助函数
export const getTechFriends = () => friends.filter(f => f.category === 'tech')
export const getFriendFriends = () => friends.filter(f => f.category === 'friend')
export const getFriendByName = (name) => friends.find(f => f.name === name)
export const getFriendsCount = () => friends.length