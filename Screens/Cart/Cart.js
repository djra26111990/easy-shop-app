import React from 'react'
import { View, Dimensions, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native'
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body } from 'native-base'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SwipeListView } from 'react-native-swipe-list-view'
import * as actions from '../../Redux/Actions/cartActions'
import CartItem from './CartItem'

let { height, width } = Dimensions.get('window')

const Cart = (props) => {

  let total = 0;
  props.cartItems.forEach(cart => {
    return (total += cart.product.price)
  })

  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: 'center' }}>Cart</H1>
            <SwipeListView
              data={props.cartItems}
              renderItem={(data) => <CartItem item={data} />}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}
                    onPress={() => props.removeFromCart(data.item)}
                  >
                    <Icon name='trash' color={'white'} size={30} />
                  </TouchableOpacity>
                </View>
              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>$ {total}</Text>
            </Left>
            <Right>
              <Button title='Clear' onPress={() => props.clearCart()} />
            </Right>
            <Right>
              <Button
                title='Checkout'
                onPress={() => props.navigation.navigate('Checkout')}
              />
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Icon name='shopping-cart' color='#d3d3d3' size={50} />
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </Container>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const { cartItems } = state
  return {
    cartItems: cartItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
  body: {
      alignItems: 'center',
      margin: 10,
      flexDirection: 'row'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
