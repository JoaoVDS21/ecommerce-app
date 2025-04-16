import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import BannersService from "@/services/BannersService";
import theme from "@/styles/theme";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
 
const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;
 
export default function CarouselBanners() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { data: banners = [], refetch } = useQuery({
    queryKey: ['banners'],
    queryFn: () => BannersService.findAll()
  })
  
  useRefreshOnFocus(refetch)
 
  return (
    <SafeAreaView>
      <Carousel
        ref={ref}
        width={width}
        height={width / 1.50}
        data={banners}
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ index, item }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
              borderRadius: 8,
              overflow: 'hidden',
              borderColor: theme.colors.border
            }}
          >
            <Image source={{uri: item.imageUrl}} style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}/>
          </View>
        )}
      />
    </SafeAreaView>
  );
}