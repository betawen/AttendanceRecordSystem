/**
 * 显示最近签到签退消息
 * 显示周数据汇总报告
 * 显示月数据汇总报告
 * 显示季度数据汇总报告
 * 每周六下午六点更新一周报告
 * 以组为单位
 * */

let express = require('express')
let router =  express.Router()

let logger = require('winston').loggers.get('message');

