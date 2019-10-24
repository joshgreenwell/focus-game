import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Container, Content, Button, Text, H1 } from 'native-base'

const setLogger = debug => debug ? (section, ...args) => console.log(`[${section}]`, ...args) : () => {}
const _log = setLogger(!process.env.PROD || true)

const HOME_SCREEN = 0
const GAME_SCREEN = 1

const BOARD_WIDTH = 6

const Home = ({ start }) => (
  <Container style={styles.container}>
    <Content>
        <H1 style={styles.title}>Focus</H1>
        <Button
          style={styles.button}
          onPress={start}
        >
          <Text style={styles.text}>
            Play!
          </Text>
        </Button>
    </Content>
  </Container>
)

const Game = () => {
  const [board, setBoard] = useState([])

  useEffect(() => {
    _log('Game', 'Initalizing game...')
    populateBoard()
    // setInterval(updateBoard, 50)
  }, [])

  const populateBoard = () => {
    _log('Game', 'Populating board...')
    _log('Game', `Board length ${BOARD_WIDTH}...`)
    const newBoard = []

    for (let i = 0; i < BOARD_WIDTH; i++) {
      const tileColumn = (<View>{_getTileColumn()}</View>)
      newBoard.push(tileColumn)
    }
    
    setBoard(newBoard)
  }

  const updateBoard = () => {
    _log('Game', 'Updating board...')
  }


  const _getTileColumn = () => {
    // Get phone screen size
    const phoneScreenSize = 15
    const column = []

    for (let i = 0; i < phoneScreenSize; i++) {
      const tile = _getTile()
      column.push(tile)
    }

    return column
  }

  const _getTile = () => (<View style={gameStyles.tile}></View>)

  return (
    <View>
      {board}
    </View>
  )
}

const App = () => {
  const [isReady, setIsReady] = useState(false)
  const [screen, setScreen] = useState(HOME_SCREEN)

  useEffect(() => {
    const setup = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
      _log('Startup', 'App started')
      setIsReady(true)
    }
    setup()
  }, [])

  const start = () => {
    _log('HomeScreen', 'Starting game...')
    setScreen(GAME_SCREEN)
  }

  return isReady
    ? screen === HOME_SCREEN
      ? <Home start={start} />
      : <Game />
    : <AppLoading />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#888',
    paddingTop: '50%'
  },
  title: {
    margin: 50
  },
  button: {},
  text: {}
})

const gameStyles = StyleSheet.create({
  tile: {
    backgroundColor: '#888',
    width: 48,
    height: 48,
    margin: 1
  }
})

export default App
