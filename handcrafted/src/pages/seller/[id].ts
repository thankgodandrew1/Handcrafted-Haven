// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// interface SellerData {
//   id: string;
//   name: string;
//   description: string;
//   // Add more fields based on your seller data structure
// }

// function SellerProfile() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [sellerData, setSellerData] = useState<SellerData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSellerData = async () => {
//       try {
//         if (!id) return;

//         // Assuming you have an API endpoint for fetching seller data
//         const response = await fetch(`/api/sellers/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch seller data');
//         }

//         const data: SellerData = await response.json();
//         setSellerData(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSellerData();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       {sellerData ? (
//         <>
//           <h1>Seller Profile: {id}</h1>
//           {/* Display seller information, such as name, description, images, videos, etc. */}
//           <p>Name: {sellerData.name}</p>
//           <p>Description: {sellerData.description}</p>
//           {/* Add more fields based on your seller data structure */}
//         </>
//       ) : (
//         <p>No seller data found for ID: {id}</p>
//       )}
//     </div>
//   );
// }

// export default SellerProfile;
