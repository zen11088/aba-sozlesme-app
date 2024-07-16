import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body, html {
    font-family: 'Poppins', sans-serif !important;
    letter-spacing: -0.03em !important;
    margin: 0;
    padding: 0;
  }
  
  :root {
    --font-weight-thin: 100;
    --font-weight-extralight: 200;
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    --font-weight-black: 900;

    --font-size-header: 46px;

    --color-white: #FFFFFF;
    --color-grey-0: #fff;
    --color-primary: #0474BA;
    --color-grey-700: #374151;
    --color-brand-500: #6366f1;
    --color-text-variant: #0C1F30;
    --color-text-form: #596168;
    --color-light-grey: #DDDDDD;
    --color-light-background: #F0F0F0;
    --color-red: #BC3232;
    --color-inactive-menu: #A6B4C1;
    --color-active-menu: #2475C0;
    --color-active-bg: rgba(186, 231, 255, 0.3);
    --color-default-bg: #FAFAFA;
    --color-menu-bg: #FDFDFD;
  }

  .ant-btn-primary {
    background-color: var(--color-primary);
  }

  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    display: none !important;
  }
`;

export default GlobalStyles;
