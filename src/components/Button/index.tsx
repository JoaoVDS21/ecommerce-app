import React, { ComponentProps, createContext, useContext } from "react";
import { ActivityIndicator, Text as TextRN, TouchableOpacity } from "react-native";
import Styles, { ContainerProps } from "./styles";
import { IconProps } from "../Icons";
import { ExtractProps } from "types/ExtractProps";

interface ButtonProps extends ExtractProps<TouchableOpacity> {
  isLoading?: boolean;
  variant?: ContainerProps['variant']
}

const ButtonContext = createContext<{variant: ContainerProps['variant']}>({
  variant: 'default'
});

function Button({
  isLoading = false, 
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <ButtonContext.Provider value={{variant}}>
      <Styles.Container
        variant={variant}
        {...props}
        children={isLoading ? <ActivityIndicator /> : props.children}
        disabled={isLoading || props.disabled}
      />
    </ButtonContext.Provider>
  )
}

function Text(props: ExtractProps<TextRN>){
  const { variant } = useContext(ButtonContext);
  
  return (
    <Styles.Text variant={variant} {...props}  />
  )
}

function Icon(props: IconProps){
  const { variant } = useContext(ButtonContext);
  
  return (
    <Styles.Icon variant={variant} {...props} />
  )
}

Button.Text = Text;
Button.Icon = Icon;

export default Button;