import { form, get, post } from './request.js'; //导入axios实例文件中方法
// let base_api = process.env.BASE_API ? './' + process.env.BASE_API : '..' //获取项目api请求地址
//根据id获取用户信息
let base_api = ''
// let base_api = 'http://192.168.0.175:8080'
// let base_api = 'http://193.112.76.40:8090'

const api = {
    // 公用上传
    uploadfile(data) {
        return form(base_api + `/uploadfile`, data)
    },
    // 公用下载
    downloadfile(data) {
        console.log(data)
        return get(base_api + `/downloadfile` + `/${data}`)
    },
    // 上传查看
    selectfile(data) {
        console.log(data)
        return get(base_api + `/selectfile` + `/${data}`)
    },
    // 登录
    login(data) {
        return form(base_api + `/login`, data)
    },
    // 登出
    logout() {
        return post(base_api + `/logout`, '')
    },
    // 注册
    register(data) {
        return form(base_api + `/register`, data)
    },
    //类型字典包
    selectdic(data) {
        return form(base_api + `/selectdic`, data)
    },
    //查询单个类型字典包
    selectonedic(data) {
        return post(base_api + `/selectonedic`, data)
    },
    //修改账户日志
    updateuser(data) {
        return post(base_api + `/updateuser`, data)
    },
    //修改密码
    updateuserpassword(data) {
        return form(base_api + `/updateuserpassword`, data)
    },
    //查询一个账户
    selectuserbyid(data) {
        return form(base_api + `/admin/selectuserbyid`, data)
    },

    /* 公告 */
    // 列表
    getallnotices(params, data) {
        return post(base_api + '/notice/getallnotices' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //查看
    getonenotice(data) {
        return form(base_api + '/notice/getonenotice', data)
    },
    //编辑 + 提交
    addorupd_noticesave(data) {
        return post(base_api + '/notice/addorupd_noticesave', data)
    },
    //删除
    del_notice(data) {
        return form(base_api + '/notice/del_notice', data)
    },

    /* 活动 */
    //列表
    getallactivitys(params, data) {
        return post(base_api + '/activity/getallactivitys' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //编辑 + 提交
    addorupd_activitysave(data) {
        return post(base_api + '/activity/addorupd_activitysave', data)
    },
    //查看
    getoneactivity(data) {
        return form(base_api + '/activity/getoneactivity', data)
    },
    //删除
    del_activity(data) {
        return form(base_api + '/activity/del_activity', data)
    },
    //报名
    apply_activity(data) {
        return form(base_api + '/activity/apply_activity', data)
    },
    //报名活动状态
    apply_activityStatus(data) {
        return form(base_api + '/activity/apply_activityStatus', data)
    },

    /* 精品资源 */
    //全部列表
    getallbtqress(params, data) {
        return post(base_api + '/btqres/getallbtqress' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //个人列表
    getnombtqress(params, data) {
        return post(base_api + '/btqres/getnombtqress' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //编辑 + 提交
    addorupd_btqressave(data) {
        return post(base_api + '/btqres/addorupd_btqressave', data)
    },
    //查看
    getonebtqres(data) {
        return form(base_api + '/btqres/getonebtqres', data)
    },
    //删除
    del_btqres(data) {
        return form(base_api + '/btqres/del_btqres', data)
    },
    //审核
    audit_btqres(data) {
        return form(base_api + '/btqres/audit_btqres', data)
    },

    /* 课程 */
    //列表
    getalllessons(params, data) {
        return post(base_api + '/lesson/getalllessons' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //编辑 + 提交
    addorupd_lessonsave(data) {
        return post(base_api + '/lesson/addorupd_lessonsave', data)
    },
    //查看
    getonelesson(data) {
        return form(base_api + '/lesson/getonelesson', data)
    },
    //删除
    del_lesson(data) {
        return form(base_api + '/lesson/del_lesson', data)
    },
    //选择学生
    selectallstudent() {
        return form(base_api + '/lesson/selectallstudent', {})
    },
    //课程下拉列表
    selectalllesson() {
        return post(base_api + '/lesson/selectalllesson', {})
    },
    //导入学生
    intoStudent() {
        return post(base_api + '/lesson/intoStudent', {})
    },

    /* 作业 */
    //教师端列表
    getallchajobs(params, data) {
        return post(base_api + '/chajob/getallchajobs' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //学生端-查询作业
    getallchajobstu(params, data) {
        return post(base_api + '/chajob/getallchajobstu' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //编辑 + 提交
    addorupd_chajobsave(data) {
        return post(base_api + '/chajob/addorupd_chajobsave', data)
    },
    //查看
    getonechajob(data) {
        return form(base_api + '/chajob/getonechajob', data)
    },
    //学生端-查询单个作业
    getonechajobstu(data) {
        return form(base_api + '/chajob/getonechajobstu', data)
    },
    //删除
    del_chajob(data) {
        return form(base_api + '/chajob/del_chajob', data)
    },
    //提交作业
    sub_chajobsave(data) {
        return post(base_api + '/chajob/sub_chajobsave', data)
    },
    //教师端查询学生作业
    getAllStuChaJobs(params, data) {
        return post(base_api + '/chajob/getAllStuChaJobs' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //作品列表
    getallchaworks(params, data) {
        return post(base_api + '/chajob/getallchaworks' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //作品编辑 + 提交
    addorupd_chaworksave(data) {
        return post(base_api + '/chajob/addorupd_chaworksave', data)
    },
    //作品查看
    getonechawork(data) {
        return form(base_api + '/chajob/getonechawork', data)
    },
    //作品删除
    del_chawork(data) {
        return form(base_api + '/chajob/del_chawork', data)
    },
    //评估列表
    getallworkassess(params, data) {
        return post(base_api + '/chajob/getallworkassess' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //添加作品评估 + 编辑
    addorupd_chaworkassess(data) {
        return post(base_api + '/chajob/addorupd_chaworkassess', data)
    },
    //查询作品评估
    getoneworkassess(data) {
        return post(base_api + '/chajob/getoneworkassess', data)
    },
    //删除作品评估
    del_workassess(data) {
        return form(base_api + '/chajob/del_workassess', data)
    },
    //作业提交查询
    sub_chajobstatus(data) {
        return form(base_api + '/chajob/sub_chajobstatus', data)
    },
    //查询作品是否评估
    selectassessstatus(data) {
        return form(base_api + '/chajob/selectassessstatus', data)
    },
    //查询作品评论
    getworkassess(data) {
        return form(base_api + '/chajob/getworkassess', data)
    },
    //查询作业是否评估
    selectjobassessstatus(data) {
        return form(base_api + '/chajob/selectjobassessstatus', data)
    },
    //添加作业评估 + 编辑
    addorupd_chajobassess(data) {
        return post(base_api + '/chajob/addorupd_chajobassess', data)
    },
    //查询单个作业评估
    getonejobassess(data) {
        return post(base_api + '/chajob/getonejobassess', data)
    },
    //查询作业评论
    getjobassess(data) {
        return form(base_api + '/chajob/getjobassess', data)
    },
    /* 讨论区 */
    //查询讨论区公告
    selectbbsnotice(data) {
        return post(base_api + '/selectbbsnotice', data)
    },
    //修改讨论区公告
    updatebbsnotice(data) {
        return form(base_api + '/updatebbsnotice', data)
    },
    //查询讨论模块
    selectbbsmodel(params, data) {
        return post(base_api + '/selectbbsmodel' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //查询论讨单个论坛模块
    selectbbsmodelbyid(data) {
        return form(base_api + '/selectbbsmodelbyid', data)
    },
    //查询帖子page
    selectbbspost(params, data) {
        return post(base_api + '/selectbbspost' + `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //添加/更新帖子
    updatebbspost(data) {
        return post(base_api + '/updatebbspost', data)
    },
    //查询单个帖子
    selectbbspostreplybyid(params, data) {
        return post(base_api + '/selectbbspostreplybyid' + `?id=${params.id}&pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`, data)
    },
    //添加/更新评论
    updatebbsreply(data) {
        return post(base_api + '/updatebbsreply', data)
    },
    //删除帖子
    deletebbspost(data) {
        return form(base_api + '/deletebbspost', data)
    },

    /* 首页 */
    //查询首页活动
    getactivitys(data) {
        return form(base_api + '/homepage/getactivitys', data)
    },
    //查询首页精品资源
    getbtqress(data) {
        return form(base_api + '/homepage/getbtqress', data)
    },
    //查询首页公告
    getnotices(data) {
        return form(base_api + '/homepage/getnotices', data)
    },
    //查询首页课程
    getlessons(data) {
        return form(base_api + '/homepage/getlessons', data)
    },

    // 投资背景详情
    seleLifeInsuranceSY(id) {
        var request_url = base_api
        if (Math.floor(id) === 1) {
            request_url += '/seleLifeInsuranceRS' // 珠江人寿
        } else if (Math.floor(id) === 2) {
            request_url += '/seleLifeInsuranceSY' // 水印·中国
        } else if (Math.floor(id) === 3) {
            request_url += '/seleLifeInsuranceHS' // 合生商业
        } else if (Math.floor(id) === 4) {
            request_url += '/seleLifeInsuranceCZ' // 合生创展
        } else if (Math.floor(id) === 5) {
            request_url += '/seleLifeInsuranceDC' // 珠江地产
        }
        return post(request_url, '') //resfulapi风格
    },
}
export default api;
