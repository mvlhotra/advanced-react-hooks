// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import React, {useContext, createContext, useState} from 'react'

const CountContext = createContext()

const CountProvider = ({children}) => {
  const [count, setCount] = useState(0)
  return (
    <CountContext.Provider value={[count, setCount]}>
      {children}
    </CountContext.Provider>
  )
}

const useCount = () => {
  const context = useContext(CountContext)
  if (!context) {
    throw new Error(
      'useCount must be used within a component that is wrapped around with a CountProvider',
    )
  }
  return context
}

// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const [count] = useCount()

  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = useCount() // did not know that you could do this
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
