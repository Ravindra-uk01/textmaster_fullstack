import React, { Component } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';

export class Footer extends Component {
  render() {
   
    
    return (
     
        <footer className="footer">
          <div className="container  text-center">
            <span className="footerText text-muted d-flex align-items-center justify-content-center">
              Made with ❤️ by Ravindra Singh Rayal.
              <a className='footerIcon'  href="https://github.com/Ravindra-uk01/textmaster_fullstack">
                <AiOutlineGithub />
              </a>
            </span>
          </div>
        </footer>
    
    );
  }
}

export default Footer;
