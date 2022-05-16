import React from 'react';
import ReactDOM from 'react-dom/client';
import {createServer, Model } from 'miragejs'
import App from './App';

createServer({
  models:{
     transaction:Model,
  },
  seeds(server){
    server.db.loadData({
      transactions : [
        {
          id: 1 ,
          title : 'vendi uma pipoca',
          type : 'deposit',
          category: 'vendas',
          amount: 5,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2 ,
          title : 'comprei uma papagaio falante',
          type : 'withdraw',
          category: 'compras',
          amount: 500,
          createdAt: new Date('2021-02-12 09:10:00')
        }
      ]
    })
  },
  routes(){
    this.namespace = 'api';
    
    this.get('/transactions' ,()=>{
      return this.schema.all('transaction')
    })
    this.post('/transaction',(squema , request)=>{
      const data = JSON.parse(request.requestBody)
      return squema.create('transaction', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
