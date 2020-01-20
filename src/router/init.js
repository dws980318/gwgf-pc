import router from './index'
import store from '../store/index'

const studentRouter = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '广外高级翻译学院-首页'
    },
    redirect: '/index',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Home/Panal'),
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '广外高级翻译学院-首页'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Home/Index')
      },
    ]
  },
  {
    path: '/discuss',
    name: 'Discuss',
    meta: {
      title: '广外高级翻译学院-讨论'
    },
    redirect: '/discuss/inform',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Panal'),
    children: [
      {
        path: 'notice',
        name: 'Notice',
        meta: {
          title: '广外高级翻译学院-公告'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Notice')
      },
      {
        path: 'schedule',
        name: 'Schedule',
        meta: {
          title: '广外高级翻译学院-学习进度'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Schedule')
      },
      {
        path: 'chapter',
        name: 'Chapter',
        meta: {
          title: '广外高级翻译学院-章节内容'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Chapter')
      },
      {
        path: 'homework',
        name: 'Homework',
        meta: {
          title: '广外高级翻译学院-测验与作业'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Homework')
      },
      {
        path: 'examination',
        name: 'Examination',
        meta: {
          title: '广外高级翻译学院-考试'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Examination')
      },
      {
        path: 'datum',
        name: 'Datum',
        meta: {
          title: '广外高级翻译学院-学习资料'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Datum')
      },
      {
        path: 'discussion',
        name: 'Discussion',
        meta: {
          title: '广外高级翻译学院-讨论区'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Discussion')
      },
      {
        path: 'note',
        name: 'Note',
        meta: {
          title: '广外高级翻译学院-笔记'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Note')
      },
      {
        path: 'evaluate',
        name: 'Evaluate',
        meta: {
          title: '广外高级翻译学院-评价'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Evaluate')
      },
      {
        path: 'inform',
        name: 'Inform',
        meta: {
          title: '广外高级翻译学院-通知'
        },
        redirect: '/discuss/inform/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Inform/Panal'),
        children: [
          {
            path: 'list',
            name: 'list',
            meta: {
              title: '广外高级翻译学院-通知列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Inform/Index')
          },
          {
            path: ':id',
            name: 'InformDetails',
            meta: {
              title: '广外高级翻译学院-通知详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Discuss/Inform/InformDetails')
          },
        ]
      },
    ]
  },
  {
    path: '/activity',
    name: 'Activity',
    meta: {
      title: '广外高级翻译学院-活动'
    },
    redirect: '/activity/course',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Activity/Panal'),
    children: [
      {
        path: 'course',
        name: 'Course',
        meta: {
          title: '广外高级翻译学院-课程活动'
        },
        redirect: '/activity/course/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Activity/Course/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-课程活动列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Activity/Course/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-课程活动新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Activity/Course/Detail')
          },
          {
            path: ':id',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-课程活动详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Activity/Course/Detail')
          },
        ]
      },
      {
        path: 'study',
        name: 'Study',
        meta: {
          title: '广外高级翻译学院-课外活动'
        },
        redirect: '/activity/study/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Activity/Study/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-课外活动列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Activity/Study/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-课外活动新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Activity/Study/Detail')
          },
          {
            path: ':id',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-课外活动详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Activity/Study/Detail')
          },
        ]
      },
    ]
  },
  {
    path: '/teach',
    name: 'Teach',
    meta: {
      title: '广外高级翻译学院-在线学习'
    },
    redirect: '/teach/list',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Teach/Panal'),
    children: [
      {
        path: 'list',
        name: 'List',
        meta: {
          title: '广外高级翻译学院-在线学习首页'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Teach/Index')
      },
      {
        path: ':id',
        name: 'CourseDetail',
        meta: {
          title: '广外高级翻译学院-课程详情'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Teach/CourseDetail')
      },
      {
        path: ':id/lecture',
        name: 'Lecture',
        meta: {
          title: '广外高级翻译学院-聊天'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Teach/Lecture')
      },
    ]
  },
  {
    path: '/assess',
    name: 'Assess',
    meta: {
      title: '广外高级翻译学院-精品资源'
    },
    redirect: '/assess/checked',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Assess/Panal'),
    children: [
      {
        path: 'checked',
        name: 'Checked',
        meta: {
          title: '广外高级翻译学院-精品资源'
        },
        redirect: '/assess/checked/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Assess/Checked/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-精品资源列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Assess/Checked/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-精品资源新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Assess/Checked/Detail')
          },
          {
            path: ':id',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-精品资源详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Assess/Checked/Detail')
          },
        ]
      },
      {
        path: 'unchecked',
        name: 'Unchecked',
        meta: {
          title: '广外高级翻译学院-精品资源未审核'
        },
        redirect: '/assess/unchecked/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Assess/Unchecked/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-精品资源未审核列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Assess/Unchecked/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-精品资源未审核新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Assess/Unchecked/Detail')
          },
          {
            path: ':id',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-精品资源未审核详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Assess/Unchecked/Detail')
          },
        ]
      },
    ]
  },
  {
    path: '/resource',
    name: 'Resource',
    meta: {
      title: '广外高级翻译学院-课程评估'
    },
    redirect: '/resource/work',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Panal'),
    children: [
      {
        path: 'work',
        name: 'Work',
        meta: {
          title: '广外高级翻译学院-作业管理'
        },
        redirect: '/resource/work/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Work/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-作业管理列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Work/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-作业管理新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Work/Details')
          },
          {
            path: ':id',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-作业管理编辑'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Work/Details')
          },
          {
            path: 'detail/:detail',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-作业管理查看学生列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Work/Detail')
          },
          {
            path: 'studDetail/:id',
            name: 'StudDetail',
            meta: {
              title: '广外高级翻译学院-作业管理查看学生详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Work/StudDetail')
          },
          {
            path: 'stuDialog/:id',
            name: 'StuDialog',
            meta: {
              title: '广外高级翻译学院-学生评价'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Work/StuDialog')
          },
          {
            path: 'teaEvaluate/:id',
            name: 'TeaEvaluate',
            meta: {
              title: '广外高级翻译学院-教师评价'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Work/TeaEvaluate')
          },
        ]
      },
      {
        path: 'production',
        name: 'Production',
        meta: {
          title: '广外高级翻译学院-学生作品管理'
        },
        redirect: '/resource/production/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Production/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-学生作品管理列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Production/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-学生作品管理新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Production/Details')
          },
          {
            path: ':id',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-学生作品管理编辑'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Production/Details')
          },
          {
            path: 'teaEvaluate/:id',
            name: 'TeaEvaluate',
            meta: {
              title: '广外高级翻译学院-教师评价'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Resource/Production/TeaEvaluate')
          },
        ]
      },
    ]
  },
  {
    path: '/personal',
    name: 'Personal',
    meta: {
      title: '广外高级翻译学院-个人中心'
    },
    redirect: '/personal/index',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Personal/Panal'),
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '广外高级翻译学院-个人中心-个人信息'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Personal/Index')
      },
      {
        path: 'safety',
        name: 'Safety',
        meta: {
          title: '广外高级翻译学院-个人中心-账户安全'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Personal/Safety')
      },
      {
        path: 'authentication',
        name: 'Authentication',
        meta: {
          title: '广外高级翻译学院-个人中心-认证信息'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Personal/Authentication')
      },
    ]
  },
  {
    path: '/comment',
    name: 'Comment',
    meta: {
      title: '广外高级翻译学院-互动讨论'
    },
    redirect: '/comment/list',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Comment/Panal'),
    children: [
      {
        path: 'list',
        name: 'List',
        meta: {
          title: '广外高级翻译学院-互动讨论列表'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Comment/Index')
      },
      {
        path: 'add',
        name: 'Add',
        meta: {
          title: '广外高级翻译学院-互动讨论新增'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Comment/Detail')
      },
      {
        path: ':id',
        name: 'Detail',
        meta: {
          title: '广外高级翻译学院-互动讨论详情'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Student/Comment/Detail')
      },
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const teacherRouter = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '广外高级翻译学院-首页'
    },
    redirect: '/index',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Home/Panal'),
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '广外高级翻译学院-首页'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Home/Index')
      },
    ]
  },
  {
    path: '/resource',
    name: 'Resource',
    meta: {
      title: '广外高级翻译学院-课程评估'
    },
    redirect: '/resource/work',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Panal'),
    children: [
      {
        path: 'work',
        name: 'Work',
        meta: {
          title: '广外高级翻译学院-作业管理'
        },
        redirect: '/resource/work/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Work/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-作业管理列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Work/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-作业管理新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Work/Details')
          },
          {
            path: ':id',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-作业管理编辑'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Work/Details')
          },
          {
            path: 'detail/:detail',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-作业管理查看学生列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Work/Detail')
          },
          {
            path: 'studDetail/:id',
            name: 'StudDetail',
            meta: {
              title: '广外高级翻译学院-作业管理查看学生详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Work/StudDetail')
          },
          {
            path: 'teaEvaluate/:id',
            name: 'TeaEvaluate',
            meta: {
              title: '广外高级翻译学院-教师评价'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Work/TeaEvaluate')
          },

        ]
      },
      {
        path: 'production',
        name: 'Production',
        meta: {
          title: '广外高级翻译学院-学生作品管理'
        },
        redirect: '/resource/production/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Production/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-学生作品管理列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Production/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-学生作品管理新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Production/Details')
          },
          {
            path: ':id',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-学生作品管理编辑'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Production/Details')
          },
          {
            path: 'teaEvaluate/:id',
            name: 'TeaEvaluate',
            meta: {
              title: '广外高级翻译学院-教师评价'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Production/TeaEvaluate')
          },
        ]
      },
      {
        path: 'assess',
        name: 'Assess',
        meta: {
          title: '广外高级翻译学院-学生作品评估管理'
        },
        redirect: '/resource/assess/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Assess/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-学生作品评估管理列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Assess/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-学生作品评估管理新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Assess/Details')
          },
          {
            path: ':id',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-学生作品评估管理编辑'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Resource/Assess/Details')
          },
        ]
      },
    ]
  },
  {
    path: '/discuss',
    name: 'Discuss',
    meta: {
      title: '广外高级翻译学院-讨论'
    },
    redirect: '/discuss/inform',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Panal'),
    children: [
      {
        path: 'notice',
        name: 'Notice',
        meta: {
          title: '广外高级翻译学院-公告'
        },
        redirect: '/discuss/notice/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Notice/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-公告列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Notice/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-公告新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Notice/Details')
          },
          {
            path: ':id',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-公告编辑'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Notice/Details')
          },
        ]
      },
      {
        path: 'schedule',
        name: 'Schedule',
        meta: {
          title: '广外高级翻译学院-学习进度'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Schedule')
      },
      {
        path: 'chapter',
        name: 'Chapter',
        meta: {
          title: '广外高级翻译学院-章节内容'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Chapter')
      },
      {
        path: 'homework',
        name: 'Homework',
        meta: {
          title: '广外高级翻译学院-作业'
        },
        redirect: '/discuss/homework/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Homework/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-作业列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Homework/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-作业新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Homework/Details')
          },
          {
            path: ':id',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-作业编辑'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Homework/Details')
          },
        ]
      },
      {
        path: 'competition',
        name: 'Competition',
        meta: {
          title: '广外高级翻译学院-活动管理'
        },
        redirect: '/discuss/competition/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Competition/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-活动管理列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Competition/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-活动管理新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Competition/Details')
          },
          {
            path: ':id',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-活动管理编辑'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Competition/Details')
          },
        ]
      },
      {
        path: 'condition',
        name: 'Condition',
        meta: {
          title: '广外高级翻译学院-学生情况'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Condition')
      },
      {
        path: 'discussion',
        name: 'Discussion',
        meta: {
          title: '广外高级翻译学院-讨论区'
        },
        redirect: '/discuss/discussion/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Discussion/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-讨论区列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Discussion/Index')
          },
          {
            path: ':id',
            name: 'Details',
            meta: {
              title: '广外高级翻译学院-讨论区详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Discussion/Details')
          },
        ]
      },
      {
        path: 'note',
        name: 'Note',
        meta: {
          title: '广外高级翻译学院-笔记'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Note')
      },
      {
        path: 'stuEvaluate',
        name: 'StuEvaluate',
        meta: {
          title: '广外高级翻译学院-评价'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/StuEvaluate')
      },
      {
        path: 'teaEvaluate/:id',
        name: 'TeaEvaluate',
        meta: {
          title: '广外高级翻译学院-教师评价'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/TeaEvaluate')
      },
      {
        path: 'payment',
        name: 'Payment',
        meta: {
          title: '广外高级翻译学院-课程支付'
        },
        redirect: '/discuss/payment/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Payment/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-课程支付列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Payment/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-课程支付新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Payment/Details')
          },
          {
            path: ':id',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-课程支付编辑'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Payment/Details')
          },
        ]
      },
      {
        path: 'inform',
        name: 'Inform',
        meta: {
          title: '广外高级翻译学院-通知'
        },
        redirect: '/discuss/inform/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Inform/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-通知列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Inform/Index')
          },
          {
            path: ':id',
            name: 'Details',
            meta: {
              title: '广外高级翻译学院-通知详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Discuss/Inform/Details')
          },
        ]
      },
    ]
  },
  {
    path: '/activity',
    name: 'Activity',
    meta: {
      title: '广外高级翻译学院-活动'
    },
    redirect: '/activity/course',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Activity/Panal'),
    children: [
      {
        path: 'course',
        name: 'Course',
        meta: {
          title: '广外高级翻译学院-课程活动'
        },
        redirect: '/activity/course/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Activity/Course/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-课程活动列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Activity/Course/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-课程活动新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Activity/Course/Detail')
          },
          {
            path: ':id',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-课程活动详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Activity/Course/Detail')
          },
        ]
      },
      {
        path: 'study',
        name: 'Study',
        meta: {
          title: '广外高级翻译学院-课外活动'
        },
        redirect: '/activity/study/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Activity/Study/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-课外活动列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Activity/Study/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-课外活动新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Activity/Study/Detail')
          },
          {
            path: ':id',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-课外活动详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Activity/Study/Detail')
          },
        ]
      },
    ]
  },
  {
    path: '/teach',
    name: 'Teach',
    meta: {
      title: '广外高级翻译学院-课程教学'
    },
    redirect: '/teach/list',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Teach/Panal'),
    children: [
      {
        path: 'list',
        name: 'List',
        meta: {
          title: '广外高级翻译学院-课程教学列表'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Teach/Index')
      },
      {
        path: 'add',
        name: 'Add',
        meta: {
          title: '广外高级翻译学院-课程教学新增'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Teach/Detail')
      },
      {
        path: ':id',
        name: 'Detail',
        meta: {
          title: '广外高级翻译学院-课程教学详情'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Teach/Detail')
      },
    ]
  },
  {
    path: '/assess',
    name: 'Assess',
    meta: {
      title: '广外高级翻译学院-精品资源'
    },
    redirect: '/assess/checked',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Assess/Panal'),
    children: [
      {
        path: 'checked',
        name: 'Checked',
        meta: {
          title: '广外高级翻译学院-精品资源'
        },
        redirect: '/assess/checked/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Assess/Checked/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-精品资源列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Assess/Checked/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-精品资源新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Assess/Checked/Detail')
          },
          {
            path: ':id',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-精品资源详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Assess/Checked/Detail')
          },
        ]
      },
      {
        path: 'unchecked',
        name: 'Unchecked',
        meta: {
          title: '广外高级翻译学院-精品资源未审核'
        },
        redirect: '/assess/unchecked/list',
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Assess/Unchecked/Panal'),
        children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              title: '广外高级翻译学院-精品资源未审核列表'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Assess/Unchecked/Index')
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              title: '广外高级翻译学院-精品资源未审核新增'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Assess/Unchecked/Detail')
          },
          {
            path: ':id',
            name: 'Detail',
            meta: {
              title: '广外高级翻译学院-精品资源未审核详情'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Assess/Unchecked/Detail')
          },
        ]
      },
    ]
  },
  {
    path: '/personal',
    name: 'Personal',
    meta: {
      title: '广外高级翻译学院-个人中心'
    },
    redirect: '/personal/index',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Personal/Panal'),
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '广外高级翻译学院-个人中心-个人信息'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Personal/Index')
      },
      {
        path: 'safety',
        name: 'Safety',
        meta: {
          title: '广外高级翻译学院-个人中心-账户安全'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Personal/Safety')
      },
      {
        path: 'authentication',
        name: 'Authentication',
        meta: {
          title: '广外高级翻译学院-个人中心-认证信息'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Personal/Authentication')
      },
    ]
  },
  {
    path: '/comment',
    name: 'Comment',
    meta: {
      title: '广外高级翻译学院-互动讨论'
    },
    redirect: '/comment/list',
    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Comment/Panal'),
    children: [
      {
        path: 'list',
        name: 'List',
        meta: {
          title: '广外高级翻译学院-互动讨论列表'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Comment/Index')
      },
      {
        path: 'add',
        name: 'Add',
        meta: {
          title: '广外高级翻译学院-互动讨论新增'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Comment/Detail')
      },
      {
        path: ':id',
        name: 'Detail',
        meta: {
          title: '广外高级翻译学院-互动讨论详情'
        },
        component: () => import(/* webpackChunkName: "navigator" */ '@/views/Teacher/Comment/Detail')
      },
    ]
  },
  {
    path: '*',
    redirect: '/index'
  }
]


export default {
  addRoute(role) {
    store.commit('setLogin', true)
    store.commit('setRole', role)
    store.commit('setHaveLogin', true)
    if (role === 0) {
      router.addRoutes(studentRouter)
    } else if (role === 1) {
      router.addRoutes(teacherRouter)
    }
  },
  addLogin(role) {
    store.commit('setLogin', true)
    store.commit('setRole', role)
    store.commit('setHaveLogin', true)
    // if (role === 0) {
    //   router.addRoutes(studentRouter)
    // } else if (role === 1) {
    //   router.addRoutes(teacherRouter)
    // }
  }
}