import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from 'react-native';
import { API_URL } from "@/lib/utils";
import { getToken } from "@/lib/authActions";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import EditProfileForm from "@/components/profile/EditProfileForm";

enum Relationship {
    self = 'SELF',
    friend = 'FRIEND',
    public = 'PUBLIC',
    private = 'PRIVATE',
    pending = 'PENDING',
}

export default function ProfilePage() {
    const { id } = useLocalSearchParams();
    const [relationship, setRelationship] = useState<Relationship>(Relationship.pending);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const getUserDetails = async () => {
            const token = await getToken();
            if (!token) {
                router.replace('/login');
                return;
            }
            const decoded = jwtDecode(token);
            if (!decoded) {
                console.error('Invalid JWT');
                return;
            }
            if (decoded.sub === id) {
                setRelationship(Relationship.self);
            }

            const jwt = JSON.parse(token);

            try {
                let response = await axios.get(`${API_URL}/api/v1/friends/check/?userId=${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt
                    }
                });
                if (response.data.isFriends === true) {
                    setRelationship(Relationship.friend);
                }

                response = await axios.get(`${API_URL}/api/v1/user/public/?id=${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.data.isPublic === true) {
                    setRelationship(Relationship.public);
                } else if (relationship === Relationship.pending) {
                    setRelationship(Relationship.private);
                }
                
                if (relationship === Relationship.private) {
                    setLoading(false);
                    return;
                }

                response = await axios.get(`${API_URL}/api/v1/user/details/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt
                    }
                });
                setUserDetails(response.data.user);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        getUserDetails();
    },[id, relationship])

    if (loading) {
        return (
            <View className='flex-1 flex-col items-center justify-center'>
                <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
                <Text>getting user details</Text>
            </View>
        )
    }
  
    return (
        <View className='flex-1 flex-col items-center justify-center'>
            <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
            {relationship === Relationship.self && userDetails && <EditProfileForm userDetails={userDetails}/>}
        </View>
    ) 
}