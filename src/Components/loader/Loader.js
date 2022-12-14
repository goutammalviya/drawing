import React from "react";
const Loader = (isLoading) => {
  return(<>
  <div className="center-xy"    style={{
                display: 'flex',
                position: 'fixed',
                minHeight: '100%',
                minWidth: '100%',
                zIndex: "50000000",
                backgroundColor:  '#00000014'
                                // opacity: '0.5'
            }}>

  {isLoading ? (<div class="lds-dual-ring"></div>): ''}
  
  </div>
  </>);
};
const AdjLoader = (isLoading) => {
  return(<>
  <div className="center-xy"    style={{
                display: 'flex',
                position: 'absolute',
                height: '100%',
                width: '100%',
                zIndex: "50000000",
                backgroundColor:  '#00000014',
                borderRadius:'inherit'
                                // opacity: '0.5'
            }}>

  {isLoading ? (<div class="lds-dual-ring"></div>): ''}
  
  </div>
  </>);
};

export {AdjLoader};

export default Loader;