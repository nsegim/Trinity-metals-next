'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Offcanvas.css'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menus from '../../common/Menu/Menu';
import ImageGallery from '../../common/ImageGallery';
import Link  from 'next/link';

const OffcanvasMenu = () => {
  const [show, setShow] = useState(false);
  const [alignment, setAlignment] = useState('right'); // Default alignment
   
  const isMediumScreen = useMediaQuery('(max-width:1024px)');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };


  return (
    <>
      <div className="offCanvas-wrapper">
          <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          className='ToggleButton'
          style={{ display: `${isMediumScreen ? 'block' : 'none'}` }}
        >
          
          <ToggleButton  value="right" aria-label="right aligned" onClick={handleShow}>
            <FormatAlignRightIcon />
          </ToggleButton>
          
        </ToggleButtonGroup>
        


          <Offcanvas variant="primary" show={show} onHide={handleClose} placement='end' >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Menus onItemClick={handleClose} />
              <div className="basic-info001">
                <div className="site-logo">
                  <Link href="/">
                    <ImageGallery imageName={undefined} 
                      imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/site-logo1.png"
                      customClass="site-image-logo"
                      
                      width={148.740234375}
                       height={69.51000213623047}

                    />
                  </Link>
                </div>
                <div className="contact-info">
                  <a href="#">
                    <ImageGallery imageName={undefined} customClass={undefined} imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/phone-icon.svg" width={13.44} height={14}/>
                    <span>+250 791 959 034</span>
                  </a>
                  <a href="#">
                    <ImageGallery imageName={undefined} customClass={undefined} imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/envelope.svg"width={13} height={14}  />
                    <span>Email: info.rw@trinity-metals.com</span>
                  </a>
                </div>

                    <ul className="social-icons">
                               <li>
                                 <a href="https://x.com/Trinity_Metals" target="_blank">
                                   <ImageGallery imageName={undefined} customClass={undefined} imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/X-icon.svg" width={14} height={14}  />
                                 </a>
                               </li>
                               <li>
                                 <a href="https://www.linkedin.com/company/trinitymetalsgroupltd/?viewAsMember=true" target="_blank" className="linkedInIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="39" viewBox="0 0 24 34">
                                      <path d="M9,17H6.477v-7H9V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2	S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826	h-2.523v-7h2.523v0.977C13.93,10.407,14.581,10,15.802,10S18,10.977,18,13.174V17z"></path>
                                    </svg>
                                 </a>
                               </li>
                               <li>
                                 <a href="https://youtu.be/tfJO_Fxl33c?si=fdC9qCcIe3P-bRro" target="_blank">
                                   <ImageGallery imageName={undefined} customClass={undefined} imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Youtube-icon.svg" width={14} height={14} />
                                 </a>
                               </li>
                     </ul>


                    
                            
              </div>
               
            </Offcanvas.Body>
          </Offcanvas>
      </div>
      
      
     
      
    </>
  );
}

export default OffcanvasMenu;