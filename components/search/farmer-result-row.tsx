import React from 'react';
import { Colors, ListItem, Text } from 'react-native-ui-lib';

const FarmerResultRow = (props) => {
  const {item} = props;

	return (
		<ListItem
      activeBackgroundColor={Colors.white}
      activeOpacity={0.3}
			style={{ backgroundColor: Colors.white, padding: 8, height: "auto" }}
    >
      <ListItem.Part column>
        <Text h2>{item.business}</Text>
        <Text h3>{item.address}</Text>
      </ListItem.Part>
    </ListItem>
	)
}

export default FarmerResultRow