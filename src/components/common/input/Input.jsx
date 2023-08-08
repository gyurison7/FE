import { styled } from "styled-components";
import PropTypes from "prop-types";

const Input = ({ onChange, name, type, value, placeholder, theme, bordercolor }) => {
  return (
    <InputStyle
      onChange={onChange}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      theme={theme}
      bordercolor={bordercolor}
    />
  );
};

const InputStyle = styled.input`
  width: 100%;
  height: 7vh;
  flex-shrink: 0;

  ${({ theme, bordercolor }) => themeHandler(theme, bordercolor)};
`;

const themeHandler = (theme, bordercolor) => {
  switch (theme) {
    case "radius":
      return `
                padding: 0 1.25rem;
                background-color: transparent;
                border-radius: 1.75rem;
                border: 1px solid #FFF;
                outline: none;
                color: #FFF;
                font-family: Apple SD Gothic Neo;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                &::placeholder {
                    color: #FFF;
                    font-size: 16px;
                }
            `;
    case "underLine":
      return `
                background-color: transparent;
                border: none;
                border-bottom: 1px solid ${bordercolor || '#5873FE'};
                outline: none;
                color: #8B8B8B;
                font-family: Pretendard Variable;
                font-size: 22px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                &::placeholder {
                    color: #8B8B8B;
                    font-size: 22px;
                }
            `;
    default:
      return;
  }
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  theme: PropTypes.oneOf(["radius", "underLine"]),
  bordercolor: PropTypes.string
};

Input.defaultProps = {
  name: "",
  type: "text",
  value: "",
  placeholder: "",
  theme: "radius",
  bordercolor: ""
};

export default Input;
