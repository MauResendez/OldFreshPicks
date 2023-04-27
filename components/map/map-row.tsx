import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Colors, ListItem, Text } from 'react-native-ui-lib';

const MapRow = ({ farmer, cover, business, name, address, onPress }) => {
	const navigation = useNavigation<any>();

	return (
		<ListItem
			activeOpacity={0.3}
			style={{ backgroundColor: Colors.white, padding: 8, height: "auto" }}
			onPress={onPress}
		>
			<ListItem.Part column>
				<Text h2 numberOfLines={3}>{business}</Text>
				<Text h3>{address}</Text>
				<Text h3>{name}</Text>
			</ListItem.Part>
		</ListItem> 
	)
}

export default memo(MapRow);