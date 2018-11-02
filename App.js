import React, { Component } from 'react';
import { Page, AppProvider, Card, Button, Modal } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
//import ApiConsole from './components/ApiConsole'
import Client from 'shopify-buy';
import Products from './components/Products';
import Cart  from './components/Cart';
import logo from './TCS.png';
import './App.css';


 // const client = Client.buildClient({
 //   domain: 'https://linkapp.com/', //the store you are pulling from have to put user input action for this
//   storefrontAccessToken: '5bd6204fa63972e879d0b8361c3ddc64' //giving the app permission to even look at the store
 // });


/*  var client = ShopifyBuy.buildClient({

    apiKey:'',
    domain: '',
    appId: ''

  });
*/
 // var $product = ('product');
 // var $cart = ('cart');
//  var $total = ('#total');
//  var $checkout = ('#checkout');

 // client.createCart().then(function(cart){
 //   $total.text(cart.subtotal)
 // });


class App extends Component {
  

/*  MyStorage(){

    var dirstring = JSON.stringify(dirst);
  
    var fs = require('fs');
    fs.writeFile("tester.json", dirstring);
  
    var dirst = {"one" : [15,4.5]};
  
  }*/
  

 /*  myCart(){
    //var linker = 'http://your-store.myshopify.com/cart/'variant: amount:;
   // var variant;
   // var amount;
    

    //var order = [ variant, amount];

    //  client.product.fetchAll().then((products) => {
      // Do something with the products
   //    console.log(products)});

   //client.collection.fetchAllWithProducts().then((collections) => {
    // Do something with the collections
  //  console.log(collections);
  //  console.log(collections[0].products);
 // });

   }
*/
constructor() {
    super();
   this.state = {
    isCartOpen: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {}
  };

  this.handleCartClose = this.handleCartClose.bind(this);
  this.addVariantToCart = this.addVariantToCart.bind(this);
  this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
  this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
}

componentWillMount() {
  this.props.client.checkout.create().then((res) => {
    this.setState({
      checkout: res,
    });
  });

  this.props.client.product.fetchAll().then((res) => {
    this.setState({
      products: res,
    });
  });

  this.props.client.shop.fetchInfo().then((res) => {
    this.setState({
      shop: res,
    });
  });
}

addVariantToCart(variantId, quantity){
  this.setState({
    isCartOpen: true,
  });

  const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
  const checkoutId = this.state.checkout.id

  return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
    this.setState({
      checkout: res,
    });
  });
}

updateQuantityInCart(lineItemId, quantity) {
  const checkoutId = this.state.checkout.id
  const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

  return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
    this.setState({
      checkout: res,
    });
  });
}

removeLineItemInCart(lineItemId) {
  const checkoutId = this.state.checkout.id

  return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
    this.setState({
      checkout: res,
    });
  });
}

handleCartClose() {
  this.setState({
    isCartOpen: false,
  });
}






  state ={
    activelink: false,//theclose model
    activeHelp: false,//the close model
     };

     
    


  render() {
    const { apiKey, shopOrigin } = window;
    const {activelink} = this.state;
    const {activeHelp} = this.state;

//what s being show in the app to get it work
    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
      <div className="App">
        <header className="App-header">
        
       <img src={logo} className="App-logo" alt="logo" /> 
          <h1 className="App-title">This is the aplication to build a link cart</h1>
        </header>
       <link rel="stylesheet"href="https://sdks.shopifycdn.com/polaris/2.10.0/polaris.min.css" /> 

      

        <button id="bl" class="Polaris-Button" onClick={this.linkhandle}>Build Link</button>
        <Modal 
          open={activelink}
          onClose={this.linkhandle}
          title="Build Your Link"
          primaryAction={{
            content: 'Create Link',// name of the button inside the model
            onAction: this.linkhandle, //event handler
          }}
          secondaryActions={[
            {
              content: 'Close',//name
              onAction: this.linkhandle,//handler
            },
          ]}
        >
        <Modal.Section>

            
            <h1>{this.state.shop.name}: React Example</h1>
            <h2>{this.state.shop.description}</h2>
          
        
        <Products
          products={this.state.products}
          client={this.props.client}
          addVariantToCart={this.addVariantToCart}
        />
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
      

              <p>
                This is a tester area for text and we will see what happens with this text box
              </p>

       
       
           
            </Modal.Section>
        </Modal>

       
       <button id="helper" class="Polaris-Button" onClick={this.helphandle}> Need Help?</button>
        <Modal 
          open={activeHelp}
          onClose={this.helphandle}
          title="Need Help"
         >
        <Modal.Section>
              <p>
                This is where the helptext box tells you how to use the link creator
              </p>
           
            </Modal.Section>
        </Modal>




        <p className="App-intro">
          
        </p>
        
      </div>
</AppProvider>
      


    );


  }

  linkhandle = () => { this.setState(({activelink}) => ({activelink: !activelink})); } //sets the state back to false closing the model
  
  helphandle = () => {this.setState(({activeHelp}) => ({activeHelp: !activeHelp}));}




}

  




/*

 render() {
    return (
      <div className="App">
        <header className="App__header">
          {!this.state.isCartOpen &&
            <div className="App__view-cart-wrapper">
              <button className="App__view-cart" onClick={()=> this.setState({isCartOpen: true})}>Cart</button>
            </div>
          }
          <div className="App__title">
            <h1>{this.state.shop.name}: React Example</h1>
            <h2>{this.state.shop.description}</h2>
          </div>
        </header>
        <Products
          products={this.state.products}
          client={this.props.client}
          addVariantToCart={this.addVariantToCart}
        />
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
      </div>
    );
  }
}

*/





export default App;
