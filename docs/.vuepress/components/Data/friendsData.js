// components/friendsData.js

export const friends = [
    // ========== 技术类 ==========
    {
        name: 'Yeelightの小屋',
        url: 'https://feiniaobf.github.io/yeekox-blog/blog/',
        avatar: '/image/Yeelightの小屋.svg',  // ✅ 正确
    },
    {
        name: '暂无',
        url: '#',
        avatar: '#',
    },

]

// 导出辅助函数
export const getTechFriends = () => friends.filter(f => f.category === 'tech')
export const getFriendFriends = () => friends.filter(f => f.category === 'friend')
export const getFriendByName = (name) => friends.find(f => f.name === name)
export const getFriendsCount = () => friends.length