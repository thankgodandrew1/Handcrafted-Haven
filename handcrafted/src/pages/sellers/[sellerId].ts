import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Seller } from '../../models/Seller'; 

const SellerProfilePage = () => {
  const router = useRouter();
  const { sellerId } = router.query;
  const [seller, setSeller] = useState<Seller | null>(null);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get<Seller>(`/api/seller/${sellerId}`);
        setSeller(response.data);
      } catch (error) {
        console.error('Error fetching seller details:', error);
      }
    };

    if (sellerId) {
      fetchSellerDetails();
    }
  }, [sellerId]);

  return (
    <div>
      {seller ? (
        <div>
          <h1>{seller.profile.bio}</h1>
          <p>Location: {seller.profile.location}</p>

          {/* Display contact info */}
          <h2>Contact Information</h2>
          <p>Email: {seller.profile.contactInfo.email}</p>
          <p>Phone: {seller.profile.contactInfo.phone}</p>
          {seller.profile.contactInfo.socialMedia && (
            <div>
              <h3>Social Media</h3>
              {seller.profile.contactInfo.socialMedia.twitter && (
                <p>Twitter: {seller.profile.contactInfo.socialMedia.twitter}</p>
              )}
              {seller.profile.contactInfo.socialMedia.facebook && (
                <p>Facebook: {seller.profile.contactInfo.socialMedia.facebook}</p>
              )}
              {seller.profile.contactInfo.socialMedia.instagram && (
                <p>Instagram: {seller.profile.contactInfo.socialMedia.instagram}</p>
              )}
            </div>
          )}

          {/* Display specialties */}
          <h2>Specialties</h2>
          <ul>
            {seller.profile.specialties.map((specialty, index) => (
              <li key={index}>{specialty}</li>
            ))}
          </ul>

          {/* Other seller details */}
          {/* ... */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SellerProfilePage;
