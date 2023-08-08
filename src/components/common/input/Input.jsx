import { styled } from "styled-components";

const Input = ({ onChange, name, type, value, placeholder, theme }) => {
    return (
        <InputStyle
            onChange={onChange}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            theme={theme}
        />
    );
};

const InputStyle = styled.input`
    width: 21.375rem;
    height: 3.5625rem;
    flex-shrink: 0;

    ${({ theme }) => themeHandler(theme)};
`;

const themeHandler = (theme) => {
    switch (theme) {
        case 'radius':
            return `
                padding: 0 1.25rem;
                background-color: transparent;
                border-radius: 1.75rem;
                border: 1px solid #FFF;
                color: #FFF;
                outline: none;
                &::placeholder {
                    color: #FFF;
                }
                `;
        case 'underLine':
            return `
                background-color: transparent;
                border: none;
                border-bottom: 1px solid #5873FE;
                color: #8B8B8B;
                outline: none;
                &::placeholder {
                    color: #8B8B8B;
                }
                `;
        default:
            return;
    }
}

export default Input;