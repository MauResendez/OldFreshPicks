import React from "react";

import Dashboard from "../../screens/products";
import CreateSubscription from "../../screens/products/create-subscription";
import EditSubscription from "../../screens/products/edit-subscription";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProduct from "../../screens/products/create-product";
import EditProduct from "../../screens/products/edit-product";

const Stack = createNativeStackNavigator();

const ProductStack = () => { 
  return (
    <Stack.Navigator 
      initialRouteName="Products" 
      screenOptions={{ 
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 17,
        }, 
      }}
    >
      <Stack.Screen name="Products" component={Dashboard} />
      <Stack.Screen name="Create Product" component={CreateProduct} />
      <Stack.Screen name="Create Subscription" component={CreateSubscription} />
      <Stack.Screen name="Edit Product" component={EditProduct} />
      <Stack.Screen name="Edit Subscription" component={EditSubscription} />
    </Stack.Navigator>
  )
}

export default ProductStack