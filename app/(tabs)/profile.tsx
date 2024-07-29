import { useSelector } from "react-redux";
import { selectName, selectImage } from "@/redux/authSlice";
import { apiLogout, getToken } from "@/lib/authActions";
import { Link, useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileDisplay from "@/components/ui/profileDisplay";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserPage = () => {
    const router = useRouter();
    const name = useSelector(selectName);
    const image = useSelector(selectImage);
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserId = async () => {
            const token = await getToken();
            if (!token) {
                apiLogout();
                router.push('/login');
                return;
            }

            const decoded = jwtDecode(token);
            const id = decoded.sub;
            if (!id) {
                console.error('JWT invalid or expired');
                apiLogout();
                router.push('/login');
                return;
            }
            setId(id);
            setLoading(false);
        }

        fetchUserId(); 
    }, [router])

    async function logout() {
        try {
            await apiLogout();
            router.push('/login');
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return (
            <View className='flex-1 flex-col items-center justify-center'>
                <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
                <Text>getting user details...</Text>
            </View>
        )
    }

    return (
        <View className='flex-1 flex-col justify-center gap-2'>
            <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
            <ProfileDisplay name={name ?? ''} image={image ?? ''} />
            <Link className="w-1/2 self-center" push href={`/user/${id}`} asChild>
                <Button>
                    <Text>Edit Profile</Text> 
                </Button> 
            </Link>

            <Link className="w-1/2 self-center" push href={`/user/${id}/activities`} asChild>
                <Button>
                    <Text>My Activities</Text> 
                </Button> 
            </Link>

            <Link className="w-1/2 self-center" push href={`/user/${id}/friends`} asChild>
                <Button>
                    <Text>My Friends</Text> 
                </Button> 
            </Link>

           <Button onPress={logout} className='w-1/2 self-center' variant={'destructive'}>
                <Text>Logout</Text>
           </Button>
        </View>
    );
}

export default UserPage;