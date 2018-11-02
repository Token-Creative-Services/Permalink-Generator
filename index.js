import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Client from 'shopify-buy'
import registerServiceWorker from './registerServiceWorker';
//import '../../shared/app.css';



const client = Client.buildClient({
    storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38', // accesss token
    domain: 'graphql.myshopify.com' //shop name
  });
  
  


ReactDOM.render(<App client={client}/>,
     document.getElementById('root'));
registerServiceWorker();
