import React from "react";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Reports from "../../screens/reports";

const Stack = createNativeStackNavigator();

const ReportStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Reports" 
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 17,
        }, 
      }}
    >
      <Stack.Screen name="Reports" component={Reports} />
    </Stack.Navigator>
  )
}

export default ReportStack