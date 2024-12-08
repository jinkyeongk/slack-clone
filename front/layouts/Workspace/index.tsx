import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, WorkspaceWrapper } from '@layouts/Workspace/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import gravatar from  'gravatar';
import useSWR from 'swr';
import Channel from '@pages/Channel';
import DirectMessage from '@pages/DirectMessage';
import Menu from '@components/Menu';
import { IUser } from '@typings/db';

const Workspace:FC = ({children}) =>{
    const [showUserMenu,setShowUserMenu] = useState(false);
  const {data:userData,error,  mutate}=useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });

    const onLogout = useCallback(()=>{
        axios.post('http://localhost:3095/api/users/logout',null,{
            withCredentials:true
        }).then((response)=>{
            mutate(false, false);
        
        });
    },[]);
    
    const onClickUserProfile = useCallback(()=>{
        setShowUserMenu((prev)=>!prev);
    },[]);
    if(userData===undefined) return(<div>로딩중....</div>);
    if(!userData) return(<Redirect to = "/login"/>);
    return(
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        {showUserMenu && (<Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>프로필메뉴</Menu>)}
                    </span>
                </RightMenu>
            </Header>
            <button onClick={onLogout} >로그아웃</button>
            <WorkspaceWrapper>
                <Workspace>test</Workspace>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>MenuScroll</MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        <Route  path="/workspace/channel" component={Channel} />
                        <Route  path="/workspace/dm" component={DirectMessage} />
                    </Switch>
                </Chats>
            </WorkspaceWrapper>
        </div>
    );
}
export default Workspace;
