import React from 'react';
import PropTypes from 'prop-types';
const icons = {
  home: (
    <>
      <g clipPath='url(#clip0_1_517)'>
        <path
          d='M1 11.385L11.385 1L21.77 11.385'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4.19531 13.7815V21.77H18.5745V13.7815'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1_517'>
          <rect width='22.6565' height='22.6565' fill='white' />
        </clipPath>
      </defs>
    </>
  ),
  group: (
    <g id='Group'>
      <path
        id='Vector'
        d='M22.2308 1H2.76923C1.79211 1 1 1.79211 1 2.76923V22.2308C1 23.2079 1.79211 24 2.76923 24H22.2308C23.2079 24 24 23.2079 24 22.2308V2.76923C24 1.79211 23.2079 1 22.2308 1Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        id='Vector_2'
        d='M8.0769 8.07692H16.9231'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        id='Vector_3'
        d='M8.0769 12.5H16.9231'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        id='Vector_4'
        d='M8.0769 16.9231H16.9231'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  ),
  inbox: (
    <>
      <path
        d='M11.3903 1C13.209 1 14.9533 1.72308 16.2393 3.01017C17.5254 4.29725 18.2479 6.04292 18.2479 7.86313C18.2479 15.4942 21.0293 16.998 21.7806 16.998H1C1.76728 16.998 4.5327 15.4782 4.5327 7.86313C4.5327 6.04292 5.25519 4.29725 6.54124 3.01017C7.82729 1.72308 9.57154 1 11.3903 1V1Z'
        strokeWidth='1.80701'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.99219 19.9257C9.13036 20.4569 9.44073 20.9272 9.87465 21.2629C10.3086 21.5985 10.8415 21.7807 11.3899 21.7807C11.9384 21.7807 12.4713 21.5985 12.9052 21.2629C13.3392 20.9272 13.6495 20.4569 13.7877 19.9257'
        strokeWidth='1.80701'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  user: (
    <>
      <g
        id='interface-user-single--close-geometric-human-person-single-up-user'
        clipPath='url(#clip0_1_521)'
      >
        <g id='Group'>
          <path
            id='Vector'
            d='M11.0011 11C13.9055 11 16.26 8.76138 16.26 5.99995C16.26 3.23853 13.9055 0.999954 11.0011 0.999954C8.09668 0.999954 5.74219 3.23853 5.74219 5.99995C5.74219 8.76138 8.09668 11 11.0011 11Z'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            id='Vector_2'
            d='M21 20.9999C20.3207 18.9859 18.9862 17.229 17.189 15.9825C15.3917 14.736 13.2246 14.0643 11 14.0643C8.7754 14.0643 6.60826 14.736 4.81103 15.9825C3.0138 17.229 1.67932 18.9859 1 20.9999H21Z'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_1_521'>
          <rect width='22.6565' height='22.6565' fill='white' />
        </clipPath>
      </defs>
    </>
  ),
  back: (
    <>
      <path
        d='M18.6429 1L1 18.6429'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 1L18.6429 18.6429'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  vectorLeft: (
    <>
      <path
        d='M9.60181 1L1.20683 9.39498C1.14154 9.45625 1.0895 9.53026 1.05393 9.61244C1.01835 9.69461 1 9.7832 1 9.87274C1 9.96228 1.01835 10.0509 1.05393 10.133C1.0895 10.2152 1.14154 10.2892 1.20683 10.3505L9.60181 18.7455'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  vectorRight: (
    <>
      <path
        d='M0.999994 14L7.15 7.85C7.19783 7.80511 7.23595 7.75089 7.26201 7.69069C7.28807 7.6305 7.30151 7.5656 7.30151 7.5C7.30151 7.4344 7.28807 7.3695 7.26201 7.30931C7.23595 7.24911 7.19783 7.19489 7.15 7.15L0.999996 0.999999'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  camera: (
    <>
      <path
        d='M12.3027 7.63477V13.5322'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.35547 10.583H15.2529'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M24 6.30769C24 5.83846 23.8136 5.38845 23.4818 5.05666C23.15 4.72486 22.7 4.53846 22.2308 4.53846H18.6923L16.0385 1H8.96154L6.30769 4.53846H2.76923C2.3 4.53846 1.84999 4.72486 1.5182 5.05666C1.1864 5.38845 1 5.83846 1 6.30769V16.9231C1 17.3923 1.1864 17.8423 1.5182 18.1741C1.84999 18.5059 2.3 18.6923 2.76923 18.6923H22.2308C22.7 18.6923 23.15 18.5059 23.4818 18.1741C23.8136 17.8423 24 17.3923 24 16.9231V6.30769Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  inviteFriends: (
    <>
      <path
        d='M14 8.5V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H2C1.73478 14 1.48043 13.8946 1.29289 13.7071C1.10536 13.5196 1 13.2652 1 13V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H6.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M10.5 1H14V4.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14 1L7.5 7.5' strokeLinecap='round' strokeLinejoin='round' />
    </>
  ),
  location: (
    <>
      <path
        d='M14.1538 7.57692C14.1538 11.2162 7.57692 20 7.57692 20C7.57692 20 1 11.2162 1 7.57692C1 5.83261 1.69292 4.15975 2.92634 2.92634C4.15975 1.69292 5.83261 1 7.57692 1C9.32123 1 10.9941 1.69292 12.2275 2.92634C13.4609 4.15975 14.1538 5.83261 14.1538 7.57692Z'
        fill='#9C9C9C'
        strokeWidth='1.46154'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.57707 9.76938C8.78785 9.76938 9.76938 8.78785 9.76938 7.57707C9.76938 6.3663 8.78785 5.38477 7.57707 5.38477C6.3663 5.38477 5.38477 6.3663 5.38477 7.57707C5.38477 8.78785 6.3663 9.76938 7.57707 9.76938Z'
        fill='white'
        stroke='white'
        strokeWidth='1.46154'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  date: (
    <>
      <path
        d='M2.26812 3.55812C1.91992 3.55812 1.63075 3.69643 1.38454 3.94264C1.13832 4.18886 1 4.5228 1 4.871V16.6871C1 17.0353 1.13832 17.3692 1.38454 17.6154C1.63075 17.8616 1.96469 18 2.3129 18H16.7547C17.103 18 17.4369 17.8616 17.6831 17.6154C17.9293 17.3692 18.0676 17.0353 18.0676 16.6871V4.871C18.0676 4.5228 17.9293 4.18886 17.6831 3.94264C17.4369 3.69643 17.103 3.55811 16.7547 3.55811H14.129'
        fill='#9C9C9C'
      />
      <path
        d='M2.26812 3.55812C1.91992 3.55812 1.63075 3.69643 1.38454 3.94264C1.13832 4.18886 1 4.5228 1 4.871V16.6871C1 17.0353 1.13832 17.3692 1.38454 17.6154C1.63075 17.8616 1.96469 18 2.3129 18H16.7547C17.103 18 17.4369 17.8616 17.6831 17.6154C17.9293 17.3692 18.0676 17.0353 18.0676 16.6871V4.871C18.0676 4.5228 17.9293 4.18886 17.6831 3.94264C17.4369 3.69643 17.103 3.55811 16.7547 3.55811H14.129'
        strokeWidth='1.3129'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.42188 3.84473H14.7485'
        strokeWidth='1.8964'
        strokeLinecap='round'
      />
      <path
        d='M4.93945 1V6.25158'
        strokeWidth='1.3129'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.1289 1V6.25158'
        strokeWidth='1.3129'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.93945 3.62549H11.5039'
        strokeWidth='1.3129'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.8164 13.4727H6.25195'
        stroke='white'
        strokeWidth='1.3129'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 8.58545H18.0676'
        stroke='white'
        strokeWidth='1.3129'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  myPageCheck: (
    <>
      <path
        id='Vector'
        d='M1 5L5.73 11.51C5.82212 11.6297 5.94016 11.727 6.07525 11.7945C6.21034 11.8621 6.35898 11.8981 6.51 11.9C6.65859 11.9017 6.8057 11.8703 6.94063 11.808C7.07555 11.7458 7.1949 11.6542 7.29 11.54L16 1'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  pencil: (
    <>
      <g id='&#235;&#139;&#137;&#235;&#132;&#164;&#236;&#158;&#132; &#235;&#176;&#148;&#234;&#190;&#184;&#234;&#184;&#176; Icon'>
        <path
          id='Vector'
          d='M1 19H16.224'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Vector_2'
          d='M9.30434 14.156L5.15234 14.9034L5.84434 10.696L15.1586 1.40938C15.2873 1.27966 15.4404 1.1767 15.609 1.10644C15.7777 1.03618 15.9586 1 16.1413 1C16.324 1 16.5049 1.03618 16.6735 1.10644C16.8422 1.1767 16.9953 1.27966 17.1239 1.40938L18.591 2.87642C18.7207 3.00508 18.8236 3.15815 18.8939 3.32681C18.9642 3.49546 19.0003 3.67636 19.0003 3.85906C19.0003 4.04177 18.9642 4.22266 18.8939 4.39131C18.8236 4.55997 18.7207 4.71304 18.591 4.8417L9.30434 14.156Z'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </>
  ),
  plus: (
    <>
      <path
        d='M12 1V23'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 11.9323H23'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  search: (
    <>
      <path
        d='M9.33846 17.6769C13.9437 17.6769 17.6769 13.9437 17.6769 9.33846C17.6769 4.73326 13.9437 1 9.33846 1C4.73326 1 1 4.73326 1 9.33846C1 13.9437 4.73326 17.6769 9.33846 17.6769Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21.0036 21L15.2344 15.2308'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  edit: (
    <>
      <path
        d='M3 5C4.10457 5 5 4.10457 5 3C5 1.89543 4.10457 1 3 1C1.89543 1 1 1.89543 1 3C1 4.10457 1.89543 5 3 5Z'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3 11.6666C4.10457 11.6666 5 10.7712 5 9.66663C5 8.56206 4.10457 7.66663 3 7.66663C1.89543 7.66663 1 8.56206 1 9.66663C1 10.7712 1.89543 11.6666 3 11.6666Z'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3 18.3334C4.10457 18.3334 5 17.4379 5 16.3334C5 15.2288 4.10457 14.3334 3 14.3334C1.89543 14.3334 1 15.2288 1 16.3334C1 17.4379 1.89543 18.3334 3 18.3334Z'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  menu: (
    <>
      <path d='M16.1276 2.26923C16.1276 3.52248 17.1435 4.53845 18.3968 4.53845C19.65 4.53845 20.666 3.52249 20.666 2.26923C20.666 1.01597 19.65 -4.44093e-08 18.3968 -9.9191e-08C17.1435 -1.53973e-07 16.1276 1.01597 16.1276 2.26923Z' />
      <path d='M8.56311 2.26923C8.56311 3.52248 9.57908 4.53845 10.8323 4.53845C12.0856 4.53845 13.1016 3.52249 13.1016 2.26923C13.1016 1.01597 12.0856 -4.44093e-08 10.8323 -9.9191e-08C9.57908 -1.53973e-07 8.56311 1.01597 8.56311 2.26923Z' />
      <path d='M0.998657 2.26923C0.998657 3.52248 2.01462 4.53845 3.26788 4.53845C4.52114 4.53845 5.53711 3.52249 5.53711 2.26923C5.53711 1.01597 4.52114 -4.44093e-08 3.26788 -9.9191e-08C2.01462 -1.53973e-07 0.998657 1.01597 0.998657 2.26923Z' />
    </>
  ),
};
export default function IconComponents({ iconType, ...props }) {
  return (
    <svg
      width='25'
      height='25'
      viewBox='0 0 25 25'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='blck'
      {...props}
    >
      {icons[iconType]}
    </svg>
  );
}
IconComponents.propTypes = { iconType: PropTypes.string.isRequired };
