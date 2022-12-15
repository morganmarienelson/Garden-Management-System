import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center p-4 border-bottom'>
        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
          <MDBIcon icon="envelope"/>
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="pagelines" className="me-3" />
            Community Garden Management System
              </h6>
              <p>
            Providing community gardening to all.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Pages</h6>
              <p>
                <a href='/' className='text-reset'>
                  Dashboard
                </a>
              </p>
              <p>
                <a href='/Forum' className='text-reset'>
                  Question Forum
                </a>
              </p>
              <p>
                <a href='/Plots' className='text-reset'>
                    Plots
                </a>
              </p>
              <p>
                <a href='/Applications' className='text-reset'>
                  Applications
                </a>
              </p>
              <p>
                <a href='/Mail' className='text-reset'>
                  Mail
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                Your Account
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Member Site
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  About Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Eau Claire, WI 54701, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                communitygarden@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <p className='text-reset fw-bold'>
          Community Garden Management System
        </p>
      </div>
    </MDBFooter>
  );
}