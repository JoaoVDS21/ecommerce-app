import { 
  Ionicons, 
  MaterialCommunityIcons, 
  MaterialIcons, 
  FontAwesome5, 
  FontAwesome, 
  Feather, 
  AntDesign,
  Entypo, 
  Fontisto
} from '@expo/vector-icons';

export const Icons = {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Entypo,
  Feather,
  AntDesign,
  Fontisto
}

export interface IconProps {
  type: any;
  name: string;
  color?: string;
  size?: number;
  style?: any;
}

const Icon = ({ type, name, color, size = 24, style }: IconProps) => {
  const fontSize = 24;
  const Tag = type;

  return (
    <>
        {type && name && (
          <Tag name={name} size={size || fontSize} color={color} style={style} />
        )}
    </>
  )
}

export default Icon;