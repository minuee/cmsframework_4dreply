import React, { useRef, useState, useCallback } from 'react'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import {ContentHeader} from '@components';
import CustomBox from './CustomBox';

interface FullScreenHandle {
    active: boolean;
    // Specifies if attached element is currently full screen.
  
    enter: () => Promise<void>;
    // Requests this element to go full screen.
  
    exit: () => Promise<void>;
    // Requests this element to exit full screen.
  
    node: React.MutableRefObject<HTMLDivElement | null>;
    // The attached DOM node
}


const Threed = () => {
    const [isFullScreen, setFullScreen] = useState<Boolean>(false);
    const handle = useFullScreenHandle();

    const reportChange = useCallback((state:any, handle:any) => {
        if (handle === handle) {
            console.log('Screen 1 went to', state, handle);
            setFullScreen(state)
        }
    }, [handle]);
    return (
    <div>
        <ContentHeader title="3D Page" />
        <div style={{zIndex:10,width:100,height:50,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',cursor:'pointer'}}>
            <a onClick={handle.enter}><h6>전체화면</h6></a>
        </div>
        <FullScreen 
            handle={handle} 
            onChange={reportChange}
        >
            <div style={{flex:1,width: isFullScreen ? '10vw' : '90vw', height: isFullScreen ? '100vh' : '70vh',display: 'flex'}}>
                <div style={{flex:1}}>
                    <CustomBox />
                </div>
                <div style={{position:'absolute',left:0,top:0,display:'flex',height:50,width: '100vw',justifyContent:'flex-end',alignItems:'center',backgroundColor:'transparent',paddingRight:50}}>
                    <button onClick={()=> {handle.exit();setFullScreen(false)}}>Exit</button>
                </div>
                
            </div>
        </FullScreen>
    </div>
    )
}

export default Threed;