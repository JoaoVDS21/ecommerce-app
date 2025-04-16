import styled, { css } from "styled-components/native";
import IconCustom from "../Icons";

export interface ContainerProps {
  variant: keyof typeof variants;
  disabled?: boolean;
}

const variants = {
  default: {
    container: css`
      background-color: ${({ theme }) => theme.colors.primary.main};
      border-color: ${({ theme }) => theme.colors.primary.main};
    `,
    text: css`
      color: ${({ theme }) => theme.colors.theme.secondary};
    `
  },
  destructive: {
    container: css`
      background-color: ${({ theme }) => theme.colors.danger.main};
      border-color: ${({ theme }) => theme.colors.danger.main};
    `,
    text: css`
      color: ${({ theme }) => theme.colors.theme.secondary};
    `
  },
  outline: {
    container: css`
      background-color: transparent;
      border-color: ${({ theme }) => theme.colors.primary.main};
    `,
    text: css`
      color: ${({ theme }) => theme.colors.primary.main};
    `
  },
  secondary: {
    container: css`
      background-color: ${({ theme }) => theme.colors.secondary.main};
      border-color: ${({ theme }) => theme.colors.secondary.main};
    `,
    text: css`
      color: ${({ theme }) => theme.colors.theme.secondary};
    `
  },
  ghost: {
    container: css`
      background-color: ${({ theme }) => theme.colors.theme.primary};
      border-color: ${({ theme }) => theme.colors.theme.primary};
    `,
    text: css`
      color: ${({ theme }) => theme.colors.theme.invert};
    `
  },
  link: {
    container: css`
      background-color: transparent;
      border-color: transparent;
    `,
    text: css`
      color: ${({ theme }) => theme.colors.theme.invert};
    `
  },
  opaque: {
    container: css`
      background-color: ${({ theme }) => theme.colors.theme.primary};
      border-color: ${({ theme }) => theme.colors.primary.main};
    `,
    text: css`
      color: ${({ theme }) => theme.colors.primary.main};
    `
  }
}

const Container = styled.TouchableOpacity<ContainerProps>`
  padding: 8px 0;
  border-width: 1px;
  border-style: solid;
  border-radius: ${({ theme }) => theme.radius.medium};
  flex-direction: row;
  gap: 8px;
  flex: 1;
  justify-content: center;
  align-items: center;

  ${({ disabled }) => disabled && css`
    opacity: 0.7;
  `};
  
  ${({ variant }) => variants[variant].container};
`

const Text = styled.Text<ContainerProps>`
  ${({ variant }) => variants[variant].text};
`

const Icon = styled(IconCustom)<ContainerProps>`
  ${({ variant }) => variants[variant].text};
`

export default {
  Container,
  Text,
  Icon
}