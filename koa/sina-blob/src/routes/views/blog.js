/**
 * @description blog view 路由
 * @author volcano
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blogProfile')
const { getSquareBlogList } = require('../../controller/blogSquare')
const { getFans, getFollowers } = require('../../controller/userRelation')
const { isExist } = require('../../controller/user')
const { getHomeBlogList } = require('../../controller/blogHome')
const { getAtMeCount } = require('../../controller/blogAt')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // 获取第一页数据
  const result = await getHomeBlogList(userId)
  const { isEmpty, blogList, pageIndex, pageSize, count } = result.data

  // 获取粉丝
  const fansRes = await getFans(userId)
  const { userList, count: fansCount } = fansRes.data

  // 获取关注人列表
  const followersResult = await getFollowers(userId)
  const { count: followersCount, followersList } = followersResult.data

  // 获取 @ 我的微博数量
  const { data: { count: atCount } } = await getAtMeCount(userId)

  await ctx.render('index', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    },
    userData: {
      // isMe,
      userInfo,
      fansData: {
        count: fansCount,
        list: userList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      atCount
    }
  })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if (isMe) {
    curUserInfo = myUserInfo
  } else {
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }

  // 获取微博第一页数据
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageIndex, pageSize, count } = result.data

  // 获取粉丝
  const fansRes = await getFans(curUserInfo.id)
  const { userList, count: fansCount } = fansRes.data

  // 获取关注人列表
  const followersResult = await getFollowers(curUserInfo.id)
  const { count: followersCount, followersList } = followersResult.data

  // 我是否关注了此人
  const amIFollowed = userList.some(item => {
    return item.userName === myUserName
  })

  // 获取 @ 我的微博数量
  const { data: { count: atCount } } = await getAtMeCount(myUserInfo.id)

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    },
    userData: {
      isMe,
      userInfo: curUserInfo,
      fansData: {
        count: fansCount,
        list: userList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      amIFollowed,
      atCount
    }
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  const result = await getSquareBlogList()
  const { isEmpty, blogList, pageIndex, pageSize, count } = result.data
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    }
  })
})

module.exports = router
