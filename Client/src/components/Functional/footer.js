import React from 'react';



const Footer = () => (
<div style={{display: 'block', width: '100%'}}>
  <div className="FlexFooterRow1">

  </div>
  <div className="FlexFooter" >
      <div className='FlexFooterColumn1'>
        <h2>Footer</h2>
        <p> Some Footer Text</p>
      </div>
      <div className='FlexFooterColumn2'>
        <div className="FlexRow"><h2> Links</h2></div>
          <div className="FlexColumn">
            <div className="FlexRow">Link 1</div>
            <div className="FlexRow">Link 2</div>
            <div className="FlexRow">Link 3</div>
          </div>
      </div>
  </div>
  <div className='FlexFooterRow2'>
    Footer Text CopyRight 2018
  </div>
</div>

);

export default Footer;
