// import axios from 'axios';

// const MERCADOPAGO_API_URL = 'https://api.mercadopago.com/v1';
// const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN; // Ensure to set this in your environment variables

// export const createPreference = async (items) => {
//     try {
//         const response = await axios.post(
//             `${MERCADOPAGO_API_URL}/checkout/preferences`,
//             {
//                 items,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${ACCESS_TOKEN}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error('Error creating Mercado Pago preference:', error);
//         throw error;
//     }
// };

// export const getPaymentStatus = async (paymentId) => {
//     try {
//         const response = await axios.get(
//             `${MERCADOPAGO_API_URL}/payments/${paymentId}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${ACCESS_TOKEN}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching payment status:', error);
//         throw error;
//     }
// };