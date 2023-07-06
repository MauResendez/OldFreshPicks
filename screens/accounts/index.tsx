import { FlashList } from '@shopify/flash-list';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { Colors, LoaderScreen, Text, View } from 'react-native-ui-lib';
import AccountRow from '../../components/accounts/account-row';
import { db } from '../../firebase';
import { global } from '../../style';

const Accounts = () => {
	const [users, setUsers] = useState<any>(null);
  const [loading, setLoading] = useState(true);

	const renderItem = useCallback(({item}: any) => {
    return <AccountRow item={item} />;
  }, []);

	useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, "Users")), async (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

	useEffect(() => {
    if (users) {
      setLoading(false);
    }
  }, [users]);

	if (loading) {
    return (
      <LoaderScreen color={Colors.tertiary} backgroundColor={Colors.white} overlay />    
    )
  }

  if (users.length == 0) {
    return (
      <View useSafeArea flex style={[global.white, global.center, global.container]}>
        <Text text65 marginV-4>No users created yet</Text>
      </View>
    )
  }

	return (
		<View useSafeArea flex style={global.white}>
      <FlashList 
        data={users}
        keyExtractor={(item: any) => item.id}
        estimatedItemSize={users.length != 0 ? users.length : 150}
        renderItem={renderItem}
      />
    </View>
	)
}

export default Accounts