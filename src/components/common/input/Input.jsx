import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const Input = ({
  onChange,
  type,
  id,
  name,
  value,
  placeholder,
  theme,
  bordercolor,
  maxLength,
  color,
}) => {
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
      maxLength={maxLength}
      color={color}
    />
  );
};

const InputStyle = styled.input`
  width: 100%;
  flex-shrink: 0;
  background-color: transparent;
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    font-size: 16px;
  }

  ${({ theme, bordercolor, color }) => themeHandler(theme, bordercolor, color)};
`;

const themeHandler = (theme, bordercolor, color) => {
  switch (theme) {
    case 'radius':
      return `
                height: 57px;
                padding: 0 1.25rem;
                border-radius: 1.75rem;
                border: 1px solid #FFF;
                outline: none;
                color: #FFF;
                &::placeholder {
                    color: rgba(255, 255, 255, 0.80);
                }
            `;
    case 'underLine':
      return `
                padding: 36px 0px 7px 0px;
                border: none;
                border-bottom: 1px solid ${bordercolor || '#CECECE'};
                outline: none;
                color: ${color || '#8B8B8B'};
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
  theme: PropTypes.oneOf(['radius', 'underLine']),
  bordercolor: PropTypes.string,
  maxLength: PropTypes.number,
  color: PropTypes.string,
};

export default Input;
