import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Login'
import Main from '@/view/Main'
//===============用户管理=============
import user from '@/view/user/platfrom'

//===============安全管理=============
//1.数据字典
import dictionary from '@/view/system/dictionary'
//2.权限
import limit from '@/view/system/limit'
//3.登录历史
import loginHistory from '@/view/system/loginHistory'
//4.菜单管理
import module from '@/view/system/module'
//5，角色管理
import role from '@/view/system/role'

//===============审核项目=============
//1.招标认证
import bidding from '@/view/audit/bidding'
//2.贷款认证
import loan from '@/view/audit/loan'
//3.实名认证
import realName from '@/view/audit/realName'


//===============财务管理=============
//1.招标查询
import borrowMoney from '@/view/finance/borrowMoney'
//2.投资查询
import invest from '@/view/finance/invest'
//3.系统流水
import systemFlow from '@/view/finance/systemFlow'


//===============员工管理=============
//1.业务管理
import business from '@/view/power/business'
//2.员工信息
import powerMessage from '@/view/power/powerMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {
          path: '/user/platfrom',
          name: 'user',
          component: user
        },
        {
          path: '/system/dictionary',
          name: 'dictionary',
          component: dictionary
        },
        {
          path: '/system/limit',
          name: 'limit',
          component: limit
        },
        {
          path: '/system/loginHistory',
          name: 'loginHistory',
          component: loginHistory
        },
        {
          path: '/system/module',
          name: 'module',
          component: module
        },
        {
          path: '/system/role',
          name: 'role',
          component: role
        },
        {
          path: '/audit/bidding',
          name: 'bidding',
          component: bidding
        },
        {
          path: '/audit/loan',
          name: 'loan',
          component: loan
        },
        {
          path: '/audit/realName',
          name: 'realName',
          component: realName
        },
        {
          path: '/finance/borrowMoney',
          name: 'borrowMoney',
          component: borrowMoney
        },
        {
          path: '/finance/invest',
          name: 'invest',
          component: invest
        },
        {
          path: '/finance/systemFlow',
          name: 'systemFlow',
          component: systemFlow
        },
        {
          path: '/power/business',
          name: 'business',
          component: business
        },
        {
          path: '/power/powerMessage',
          name: 'powerMessage',
          component: powerMessage
        },
      ]
    }
  ]
})
