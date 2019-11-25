import React, {useEffect, useRef, useContext} from 'react';
import {ADYEN_JS_URL, ADYEN_CSS_URL} from './config';
import paymentMethodsMock from '../data/paymentMethodsMock.json';
// import {CartContext} from './cart/context';
// import {Client, Config, AdyenCheckout} from '@adyen/api-library';

const CHECKOUT_APIKEY = process.env.REACT_APP_API_KEY;

// const MERCHANT_ACCOUNT = process.env.REACT_APP_MERCHANT_ACCOUNT;
export default function AdyenDropin () {
  function initAdyenCheckout () {
    const configuration = {
      locale: 'en_US',
      environment: 'test',
      originKey: CHECKOUT_APIKEY,
      paymentMethodsResponse: paymentMethodsMock,
      amount: {
        value: 0,
        currency: 'EUR',
      },
    };

    // You can add AdyenCheckout to your list of globals and then delete the window reference:
    const checkout = new window.AdyenCheckout (configuration);
    // If you need to refer to the dropin externaly, you can save this inside a variable:
    const dropin = checkout
      .create ('dropin', {
        onSubmit: (props, dropin) => {
          console.log (this.props.data);
          dropin.setStatus ('loading');
          // makePaymentCall(props.data).then...
        },
        onAdditionalDetails: (props, dropin) => {
          // makeDetailsCall(props.data).then...
        },
      })
      .mount (dropinRef.current);
  }

  const dropinRef = useRef (null);

  useEffect (() => {
    const link = document.createElement ('link');
    link.rel = 'stylesheet';
    link.href = ADYEN_CSS_URL;
    document.head.appendChild (link);

    const script = document.createElement ('script');
    script.src = ADYEN_JS_URL;
    script.async = true;
    script.onload = initAdyenCheckout; // Wait until the script is loaded before initiating AdyenCheckout
    document.body.appendChild (script);
  }, []);

  return <div ref={dropinRef} />;
}
