import styled from "styled-components";

const Button = styled.button<{ variant?: string }>`
  background-color: ${(props) => (props.variant === "primary" ? "#1677fe" : "#ffffff")};
  border: none;
  border: ${(props) => (props.variant === "primary" ? "none" : "1px solid #e0e0e0")};
  color: ${(props) => (props.variant === "primary" ? "white" : "black")};
  padding: ${(props) => (props.variant === "primary" ? "10px 20px" : "10px 12px")};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: ${(props) => (props.variant === "primary" ? "5px" : "7px")};
`;

export default Button;
