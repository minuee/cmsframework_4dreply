import React, {useCallback,useState} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import {ContentHeader} from '@components';

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

const Dashboard = () => {
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
      <FullScreen 
        handle={handle} 
        onChange={reportChange}
      >
        <div style={{flex:1,width: '100vw', height:'100vh',background: "green",display: isFullScreen ? 'flex' : 'none'}}>
          <div style={{display:'flex',height:50,width: '100vw',justifyContent:'flex-end',alignItems:'center',backgroundColor:'#ff0000',paddingRight:50}}>
            {/*  <button onClick={()=> {handle.enter();setFullScreen(true);}}>
              Switch
            </button> */}
            <button onClick={()=> {handle.exit();setFullScreen(false);}}>
              Exit
            </button>
          </div>
          <div style={{flex:1}}>

          </div>
        </div>
      </FullScreen>
      <ContentHeader title="DashBaord Page" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>150</h3>
                  <p>New Orders</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a 
                  onClick={handle.enter}
                  //href="/" 
                  className="small-box-footer pointer"
                >
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>
                    53<sup style={{fontSize: '20px'}}>%</sup>
                  </h3>

                  <p>Bounce Rate</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>44</h3>

                  <p>User Registrations</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>65</h3>

                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
