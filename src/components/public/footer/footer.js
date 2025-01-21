import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function PublicFooter() {
  const { validate } = useSelector((state) => {
    return state;
  });
  return (
    <>
      {!validate?.payload?.success ? (
        <div className='public-footer sec-padding-10'>
          <div className='mid-width'>
            <div className='footer-content w-100 d-flex flex-column flex-md-row align-items-center justify-content-between'>
              {/* <div className='footer-content w-100 d-flex flex-column  align-items-center justify-content-between'> */}
            
              <ul className="footer-inline-nav">
                <li><Link to="/terms-use"> Terms of Use</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      ) : (null)}
    </>
  );
};
