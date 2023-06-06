import * as SplashScreen from 'expo-splash-screen';
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";

import { Colors, TextField, View } from "react-native-ui-lib";
import FarmerList from "../../components/search/farmer-list";
import ProductList from "../../components/search/product-list";
import { auth, db } from "../../firebase";
import { global } from "../../style";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Search = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [farmers, setFarmers] = useState(null);
  const [products, setProducts] = useState(null);
  const [fp, setFP] = useState(null);
  const [ff, setFF] = useState(null);

  const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, "Users"), where("farmer", "==", true), where(documentId(), "!=", auth.currentUser.uid)), async (snapshot) => {
      setFarmers(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    })

    const subscriber2 = onSnapshot(query(collection(db, "Products"), where("user", "!=", auth.currentUser.uid)), async (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    });

    // Unsubscribe from events when no longer in use
    return () => {
      subscriber();
      subscriber2();
    } 
  }, []);

  useEffect(() => {
    try {
      if (!farmers || !products) {
        return;
      }

      if (search.length == 0) {
        const ff = shuffle(farmers);
        const fp = shuffle(products);

        setFF(ff);
        setFP(fp);
      } else {
        const fr = farmers.filter(result => {
          return (result.business.toLowerCase().indexOf(search.toLowerCase()) !== -1 || result.address.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        });
    
        const pr = products.filter(result => {
          return result.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
  
        const ff = shuffle(fr);
        const fp = shuffle(pr);
    
        setFF(ff);
        setFP(fp);
      }  
    } catch (error) {
      console.log(error);
    }
  }, [farmers, products, search]);

  useEffect(() => {
    if (ff && fp) {
      setLoading(false);
      SplashScreen.hideAsync();
    }
  }, [ff, fp]);

  if (loading) {
    return null;
    // return (
    //   <LoaderScreen color={"#32CD32"} />
    // )
  }

  return (
    <View useSafeArea flex style={global.bgWhite}>
      <View style={styles.search}>
        <TextField fieldStyle={{ backgroundColor: Colors.grey60, borderRadius: 8, margin: 8, padding: 12 }} value={search} onChangeText={(value) => setSearch(value)} placeholder="Farmers, produce, subscriptions, etc." placeholderTextColor={Colors.grey30} leadingAccessory={<Ionicon name="search" color={Colors.grey30} size={20} style={{ marginRight: 8 }} />} migrate />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={Platform.OS == "web"}
      >
        <FarmerList title={"Farmers"} description={"Available Farmers"} farmers={ff} />
        <ProductList title={"Products"} description={"Available Products"} products={fp} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 8
  },
  header: {
    paddingBottom: 12, 
    marginHorizontal: 16, 
    flexDirection: "row", 
    alignItems: "center" 
  },
  flex: {
    flex: 1
  },
  greeting: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    paddingTop: 8 
  },
  search: {
    padding: 6,
  }, 
});

export default Search