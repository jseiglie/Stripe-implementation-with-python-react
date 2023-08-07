import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../component/CheckoutForm.jsx";

const stripePromise = loadStripe("pk_test_51LTCnvA9wzTLXCekEhm8avkeiNhSTSIGyDiiW5mv6I980PUyArXqXDBJiiYemkIhhAJr7WncWbslGBEHQdRGUnKw001ZOSE45L");

export const Payment = () => {
    // Make sure to call loadStripe outside of a component’s render to avoid
    // recreating the Stripe object on every render.
    // This is your test publishable API key.

   
        const [clientSecret, setClientSecret] = useState("");

        useEffect(() => {
            // Create PaymentIntent as soon as the page loads
            fetch("https://zany-computing-machine-jpjrvwg6wxpc46w-3001.app.github.dev/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }, []);

        const appearance = {
            theme: 'stripe',
        };
        const options = {
            clientSecret,
            appearance,
        };

        return (
            <div className="App">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>

        )
    }