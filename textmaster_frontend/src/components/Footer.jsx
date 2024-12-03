import React, { Component } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';

export class Footer extends Component {
  render() {
    let styles = {
      fontSize: '2em',
      color: 'black',
      marginLeft: '.9rem',
    };
    
    return (
     
        <footer className="footer mt-auto py-3 bg-light">
          <div className="container text-center">
            <span className="text-muted">
              Made with ❤️ by Ravindra Singh Rayal.
              <a style={styles} href="https://github.com/Ravindra-uk01/textmaster_fullstack">
                <AiOutlineGithub />
              </a>
            </span>
          </div>
        </footer>
    
    );
  }
}

export default Footer;
