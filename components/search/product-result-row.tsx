import React from 'react';
import { Colors, ListItem, Text } from 'react-native-ui-lib';

const ProductResultRow = (props) => {
  const {item} = props;

	return (
		<ListItem
      activeBackgroundColor={Colors.white}
      activeOpacity={0.3}
			style={{ backgroundColor: Colors.white, padding: 8, height: "auto" }}
    >
      <ListItem.Part column>
        <Text h2 numberOfLines={1}>{item.title}</Text>
        <Text h3>${item.price.toFixed(2)}/{item.amount}</Text>
      </ListItem.Part>
    </ListItem>
	)
}

export default ProductResultRow