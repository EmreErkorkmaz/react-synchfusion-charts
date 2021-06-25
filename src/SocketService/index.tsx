import React, { useEffect, useState } from 'react'

const socket = new WebSocket('wss://ws.finnhub.io?token=c3a5lpaad3idt41ddsg0');

export function useSocketService() {
  const [data, setData] = useState([]);
  const [arr, setArr] = useState([]);

  useEffect(() => {

    // Connection opened -> Subscribe
    socket.addEventListener('open', function (event) {
      // socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AAPL' }))
      // socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' }))
      socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'IC MARKETS:1' }))
    });

    return () => {
      // unsubscribe('AAPL');
      // unsubscribe('BINANCE:BTCUSDT');
      unsubscribe('IC MARKETS:1');
    }
  }, [])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setArr([...arr, ...data])
  }, [data])

  // useEffect(() => {
  //   console.log(arr);
  // }, [arr])


  // Listen for messages
  const getData = () => {
    socket.addEventListener('message', function (event) {
      const incomingData = JSON.parse(event.data)
      if (incomingData.type = "trade" && !!incomingData.data) {
        setData(incomingData.data)

      }
    });
  }


  // Unsubscribe
  var unsubscribe = function (symbol: string) {
    socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
  }

  return arr;
}

