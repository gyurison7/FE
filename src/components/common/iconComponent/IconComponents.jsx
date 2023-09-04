import React from 'react';
import PropTypes from 'prop-types';
const icons = {
  home: (
    <>
      <g clipPath='url(#clip0_1_517)'>
        <path
          d='M0.809082 11.3282L11.3282 0.809158L21.8472 11.3282'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4.0459 13.7557V21.8473H18.6108V13.7557'
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
        d='M12.5093 1C14.5239 1 16.456 1.8003 17.8806 3.22486C19.3051 4.64941 20.1054 6.58151 20.1054 8.59613C20.1054 17.0422 23.1864 18.7066 24.0186 18.7066H1C1.84992 18.7066 4.91316 17.0245 4.91316 8.59613C4.91316 6.58151 5.71346 4.64941 7.13802 3.22486C8.56257 1.8003 10.4947 1 12.5093 1V1Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.85327 21.947C10.0063 22.5349 10.3501 23.0554 10.8308 23.427C11.3114 23.7985 11.9018 24.0001 12.5093 24.0001C13.1168 24.0001 13.7071 23.7985 14.1878 23.427C14.6684 23.0554 15.0122 22.5349 15.1653 21.947'
        strokeWidth='2'
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
            d='M11.3283 11.3282C14.233 11.3282 16.5878 8.97342 16.5878 6.06865C16.5878 3.16389 14.233 0.809113 11.3283 0.809113C8.4235 0.809113 6.06873 3.16389 6.06873 6.06865C6.06873 8.97342 8.4235 11.3282 11.3283 11.3282Z'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            id='Vector_2'
            d='M21.3296 21.8473C20.6502 19.7286 19.3155 17.8805 17.5181 16.5693C15.7206 15.2581 13.5532 14.5516 11.3284 14.5516C9.10349 14.5516 6.93609 15.2581 5.13864 16.5693C3.34119 17.8805 2.00656 19.7286 1.32715 21.8473H21.3296Z'
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
        d='M8.50461 16.0092C12.6493 16.0092 16.0092 12.6493 16.0092 8.50461C16.0092 4.35993 12.6493 1 8.50461 1C4.35993 1 1 4.35993 1 8.50461C1 12.6493 4.35993 16.0092 8.50461 16.0092Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.9989 19L13.8066 13.8077'
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
  alarm: (
    <>
      <path
        d='M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6 4.07715V6.00023L7.95385 8.27715'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  menuComment: (
    <>
      <path
        d='M12.5 24C18.8513 24 24 18.8513 24 12.5C24 6.14873 18.8513 1 12.5 1C6.14873 1 1 6.14873 1 12.5C1 18.8513 6.14873 24 12.5 24Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.5018 13.3845C12.9904 13.3845 13.3864 12.9884 13.3864 12.4998C13.3864 12.0113 12.9904 11.6152 12.5018 11.6152C12.0132 11.6152 11.6172 12.0113 11.6172 12.4998C11.6172 12.9884 12.0132 13.3845 12.5018 13.3845Z'
        fill='#C1C1C1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.19712 13.3845C7.68567 13.3845 8.08173 12.9884 8.08173 12.4998C8.08173 12.0113 7.68567 11.6152 7.19712 11.6152C6.70856 11.6152 6.3125 12.0113 6.3125 12.4998C6.3125 12.9884 6.70856 13.3845 7.19712 13.3845Z'
        fill='#C1C1C1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.8065 13.3845C18.295 13.3845 18.6911 12.9884 18.6911 12.4998C18.6911 12.0113 18.295 11.6152 17.8065 11.6152C17.3179 11.6152 16.9219 12.0113 16.9219 12.4998C16.9219 12.9884 17.3179 13.3845 17.8065 13.3845Z'
        fill='#C1C1C1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  OxButton: (
    <>
      <path
        d='M18.8999 10.0972L10.0938 18.9033'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.0938 10.0972L18.8999 18.9033'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.5 28C21.9558 28 28 21.9558 28 14.5C28 7.04416 21.9558 1 14.5 1C7.04416 1 1 7.04416 1 14.5C1 21.9558 7.04416 28 14.5 28Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
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
