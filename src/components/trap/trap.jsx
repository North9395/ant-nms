/*create date: 19/11/4
 *last change: 19/11/4
 *遗留问题：
 * 1. trap请求返回的是 text类型
 * 2. trap.jsx:73 Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
*/
import React, { Component } from 'react';
import { Modal, Icon } from 'antd';

import { getTrap } from './config';
import './trap.scss';

class Trap extends Component {
    constructor(props) {
        super(props);
        this.trapPreInformation = [];
        this.trapCurInformation = [];
        this.isInfoChange = false;
        this.trapIndex = 0;
        this.trapTimer = null;
        this.scrollTimer = null;
        this.bulbTimer = null;
        this.voiceTimer = null;
        this.voiceInterval = 300;
        this.bulbInterval = 500;
        this.interval = 1000;
        this.scrollInterval = 1500;
        this.state = {
            isShutupByUser : false,
            // isTrap: false,
            showTrapBox: false,
            // trapScrollInfo: '',
            isTrap: true,
            trapScrollInfo: '模拟告警信息',
        }
    }

   initTrap = () => {
        this.trapPreInformation = [];
        this.isShutupByUser = false;
        this.trapCurInformation = [];
        this.setState({
            isTrap: false,
            isShutupByUser : false,
        })
    }
    checkTrap = () => {
        if (this.trapCurInformation.length > 0) {
            if (this.state.isShutupByUser) {
                for (let newTrap of this.trapCurInformation) {
                    if ( !this.trapPreInformation.includes(newTrap) ) {
                        this.setState({
                            isShutupByUser: false,
                            isTrap: true,
                        })
                        break;
                    }
                }
            } else {
                this.setState({
                    isTrap: true,
                })
            }
        }
    }

    trapForVoice = () => {
        if(navigator.userAgent.indexOf("Chrome")>-1 || navigator.userAgent.indexOf("Firefox")>-1){
            const audioEle = document.getElementsByClassName('trap-audio')[0];
            if (audioEle) {
                audioEle.currentTime = 0;
                audioEle.muted = false;
                // audioEle.play();
            }
        }
        if (this.voiceTimer)
            clearTimeout(this.voiceTimer);
        if (this.setState.isShutupByUser)
            this.voiceTimer = setTimeout(this.trapForVoice, this.voiceInterval);
        
    }

    displayScrollInfo = () => {
        const trapNum = this.trapCurInformation.length;
        if (this.isInfoChange) {
            this.trapIndex = 0;
        } else if (trapNum > 0) {
            this.trapIndex = (Number(this.trapIndex) + 1) % Number(trapNum); 
        }
        const trapInfo = this.trapCurInformation[this.trapIndex];
        this.setState({
            trapScrollInfo: trapInfo,
        })
        if (this.scrollTimer)
            clearTimeout(this.scrollTimer);
        if (this.setState.isTrap)
            setTimeout(this.displayScrollInfo, this.scrollInterval);
    }
    toggleBulb = () => {
        const bulbEle = document.getElementsByClassName('jumpTrap')[0];
        if (bulbEle) {
            if (Number(bulbEle.style.opacity) === 0) {
                bulbEle.style.opacity = 1;
            } else {
                bulbEle.style.opacity = 0;
            }
        }
        if (this.bulbTimer)
            clearTimeout(this.bulbTimer);
        if (this.state.isTrap) {
            this.bulbTimer = setTimeout(this.toggleBulb, this.bulbInterval);
        }
    }

    getTrapInfo = () => {
        getTrap()
            .then(data => {
                if (data) {
                    // 模拟数据使用
                    data = data.data.data;
                    if (data.length === 0) {
                        this.initTrap();
                    } else {
                        if (data === this.trapPreInformation.join('\n'))
                           this.setState({
                               isInfoChange: false,
                           })
                        else 
                            this.setState({
                                isInfoChange: true,
                            })
                        this.trapCurInformation = data.split('\n');
                    }
                }
            })
        this.checkTrap();
        this.trapPreInformation = this.trapCurInformation;

        if (this.state.isTrap) {
            if (!this.state.isShutupByUser) {
                this.trapForVoice();
            }
            this.displayScrollInfo();
            this.toggleBulb();
        }
        
        if (this.trapTimer) 
            clearTimeout(this.trapTimer);
        this.trapTimer = setTimeout(this.getTrapInfo, this.interval);
    }
    componentDidMount() {
        this.getTrapInfo();
    }

    // 交互
    handleOk = (e) => {
        this.setState({
            showTrapBox: false,
        });
      }
    
      handleCancel = (e) => {
        this.setState({
            showTrapBox: false,
        });
      }
      toggleScrollBox = () => {
          this.setState({
              showTrapBox: !this.state.showTrapBox,
          })
      }
      toggleShutByUser = () => {
          this.setState({
              isShutupByUser: !this.isShutupByUser
          })
      }
    render() {
        const { isTrap, isShutupByUser, showTrapBox, trapScrollInfo } = this.state;
        const trapInfos = this.trapCurInformation.map((info, index) => {
            return <p key={index}>{info}</p>;
        })
        return (
            <div>
                <div className="trap-scroll" id="trapDisplayController" style={{'display': isTrap ? 'block' : 'none'}}>
                    
                    <Icon
                        id="shutupNoise"
                        className="trap-button"  
                        type={isShutupByUser ? "pause" : "sound"}
                        onClick={this.toggleShutByUser}
                    />
                    <Icon
                        id="showTrapInfo"
                        className="trap-button" 
                        type={showTrapBox ? "up-square" : "down-square"}
                        onClick={this.toggleScrollBox} 
                    />
                    <Icon className="jumpTrap trap-button" type="bulb"/>

                    <p className="trapScrollInfo">{trapScrollInfo}</p>
                </div>
                <Modal 
                    title="告警信息"
                    visible={showTrapBox}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确定"
                >
                    {trapInfos}
                </Modal>
                
                <audio className="trap-audio" muted>
                    <source src="client/audio/trap.mp3" type="audio/mp3" />
                    <source src="client/audio/trap.wav" type="audio/wav" />
                </audio>
            </div>
        );
    }
}

export default Trap;