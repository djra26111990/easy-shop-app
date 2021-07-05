import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, FlatList, Dimensions, ScrollView } from 'react-native'
import ProductList from './ProductList'
import data from '../../assets/data/products.json'
import productsCategories from '../../assets/data/categories.json'
import { Container, Header, Icon, Input, Text, Item } from 'native-base'
import SearchedProducts from './SearchedProducts'
import Banner from '../../Shared/Banner'
import CategoryFilter from './CategoryFilter'

let { height } = Dimensions.get('window')

const ProductContainer = (props) => {
  const [products, setProducts] = useState([])
  const [productsFiltered, setProductsFiltered] = useState([])
  const [focus, setFocus] = useState()
  const [categories, setCategories] = useState([])
  const [productsCtg, setProductsCtg] = useState([])
  const [active, setActive] = useState()
  const [initialState, setInitialState] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setProducts(data)
    setProductsFiltered(data)
    setFocus(false)
    setCategories(productsCategories)
    setProductsCtg(data)
    setActive(-1)
    setInitialState(data)
    setLoading(false)

    return () => {
      setProducts([])
      setProductsFiltered([])
      setFocus()
      setCategories([])
      setActive()
      setInitialState()
    }
  }, [])

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const openList = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ]
    }
  }

  return (
    <>
      {loading == false ? (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name='ios-search' />
              <Input
                placeholder='Search'
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
              />
              {focus == true ? (
                <Icon onPress={onBlur} name='ios-close' />
              ) : null}
            </Item>
          </Header>
          {focus == true ? (
            <SearchedProducts
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item.name}
                          item={item}
                        />
                      )
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Container>
      ) : (
        // Loading
        <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
          <ActivityIndicator size='large' color='red' />
        </Container>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProductContainer