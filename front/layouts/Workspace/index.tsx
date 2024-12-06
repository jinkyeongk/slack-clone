import { Header, ProfileImg, RightMenu } from '@layouts/Workspace/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR, { mutate } from 'swr';

const Workspace:FC = ({children}) =>{

  const {data,error,  mutate}=useSWR( 'http://localhost:3095/api/users',fetcher);

    const onLogout = useCallback(()=>{
        axios.post('/api/users/logout',null,{
            withCredentials:true
        }).then((response)=>{
            mutate(false, false);
        
        });
    },[]);

    if(!data) return<Redirect to = "/login"/>
    return(
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src ="" alt={data.nickname} />
                    </span>
                </RightMenu>
            </Header>
            <button onClick={onLogout} >로그아웃</button>
            {children}
        </div>
    );
}
export default Workspace;
