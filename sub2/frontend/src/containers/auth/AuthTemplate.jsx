import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// 흰색 박스
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

export default function AuthTemplate({children}) {

    return (
        <div>
            <AuthTemplateBlock>
                <WhiteBox>
                    <div className="logo-area">
                        <Link to="/">React</Link>
                    </div>
                    {children}
                </WhiteBox>
                
            </AuthTemplateBlock>
        </div>
    )

}