import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback } from "react";
import { Text, View } from "react-native-ui-lib";
import Ionicon from "react-native-vector-icons/Ionicons";
import FarmerCard from "./farmer-card";

const FarmerList = ({ title, description, farmers }) => {
  const navigation = useNavigation<any>();

  const renderItem = useCallback(({item}) => {
    return (
      <FarmerCard item={item} />
    );
  }, []);

  return (
    <View>
      <View row spread marginH-16 marginT-16 centerV>
        <View>
          <Text text65 marginV-4>{title}</Text>      
          <Text text90L marginV-4>{description}</Text>
        </View>

        <Ionicon name={"arrow-forward"} size={32} onPress={() => navigation.navigate("Farmers")}/>
      </View>

      <FlashList 
        data={farmers}
        keyExtractor={(item: any) => item.id}
        horizontal
        contentContainerStyle={{ padding: 16 }}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={farmers.length != 0 ? farmers.length : 150}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FarmerList;