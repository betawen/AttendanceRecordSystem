#!/usr/bin/env python
# coding: utf-8

from twisted.internet.protocol import Protocol
from twisted.internet.protocol import Factory
from twisted.internet.endpoints import TCP4ServerEndpoint
from twisted.internet import reactor
from twisted.python import log
from twisted.protocols.policies import TimeoutMixin
import binascii
import csv
import time
import requests
import json

csvfile = open('ReceivedLog.csv', 'a+')
csvWriter = csv.writer(csvfile)
csvWriter.writerow(['IP', 'MAC', 'Strength', 'Time'])
status = {}
MacLastTime = {}

class Echo(Protocol):
    # 协议类实现用户的服务协议，例如 http,ftp,ssh 等
    def __init__(self, factory):
        self.factory = factory

    def connectionMade(self):
        #self.setTimeout(self.conn_timeout)
        # 连接建立时被回调的方法
        self.factory.numProtocols = self.factory.numProtocols + 1
        print('client：' + self.transport.getPeer().host +
              ":" + str(self.transport.getPeer().port))

    def connectionLost(self, reason):
        #self.setTimeout(None)
        # 连接关闭时被回调的方法
        self.factory.numProtocols = self.factory.numProtocols - 1

    def dataReceived(self, data):
        #self.setTimeout(self.data_timeout)
        data = data.decode('utf8')
        for oneData in data.split('\n'):
            if len(oneData) < 10:
               continue
            mac = oneData.split(',')[0][4:].replace('0x','').replace('.',':')
            if mac == 'FF:FF:FF:FF:FF:FF':
                continue
            rssi = oneData.split(',')[1][5:]
            csvWriter.writerow([self.transport.getPeer().host, mac, rssi, time.asctime(time.localtime(time.time()))])
            if mac in status.keys():
                if (time.time() - MacLastTime[mac]) >= 180:
                    status[mac] = (status[mac] + 1) % 2
                    data = {'mac_id': mac, 'msg': status[mac]}
                    requests.post('http://127.0.0.1:3000/user/attend', data)
                    
            else:
                status[mac] = 0
                data = {'mac_id': mac, 'msg': status[mac]}
                requests.post('http://127.0.0.1:3000/user/attend', data)
            MacLastTime[mac] = time.time()
            
        # 接收数据的函数，当有数据到达时被回调
        self.transport.write('00'.encode('utf-8'))
        csvfile.flush()


class EchoFactory(Factory):

    #  协议工厂类，当客户端建立连接的时候，创建协议对象，协议对象与客户端连接一一对应
    numProtocols = 0

    def buildProtocol(self, addr):
        return Echo(self)


reactor.listenTCP(12345, EchoFactory())
# 开始监听事件
reactor.run()
