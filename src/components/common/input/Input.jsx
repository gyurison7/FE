import { styled } from "styled-components";
import PropTypes from "prop-types";

const Input = ({ onChange, type, id, name, value, placeholder, theme, bordercolor, maxlength }) => {
  return (
    <InputStyle
      onChange={onChange}
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      theme={theme}
      bordercolor={bordercolor}
      maxlength={maxlength}
    />
  );
};

const InputStyle = styled.input`
  width: 90%;
  height: 3.5625rem;
  flex-shrink: 0;
  background-color: transparent;
  font-family: Apple SD Gothic Neo;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &::placeholder {
      font-size: 1rem;
  }

  ${({ theme, bordercolor }) => themeHandler(theme, bordercolor)};
`;

const themeHandler = (theme, bordercolor) => {
  switch (theme) {
    case "radius":
      return `
                padding: 0 1.25rem;
                border-radius: 1.75rem;
                border: 1px solid #FFF;
                outline: none;
                color: #FFF;
                &::placeholder {
                    color: rgba(255, 255, 255, 0.80);
                }
            `;
    case "underLine":
      return `
                border: none;
                border-bottom: 1px solid ${bordercolor || '#5873FE'};
                outline: none;
                color: #8B8B8B;
                &::placeholder {
                    color: #8B8B8B;
                }
            `;
    default:
      return;
  }
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  theme: PropTypes.oneOf(["radius", "underLine"]),
  bordercolor: PropTypes.string,
  maxlength: PropTypes.number,
};

export default Input;
