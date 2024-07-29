import SearchedUsersList from '@/components/friends/SearchedUsersList';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SearchedUserDetails } from '@/lib/types/userTypes';
import { API_URL } from '@/lib/utils';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

export default function FriendsPage() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);
  const [searchedUsers, setSearchedUsers] = useState<SearchedUserDetails[]>();
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/user/search?search=${params.query}`);
        setSearchedUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, [params.query]);

  const onChangeText = useDebouncedCallback(async (input: string) => {
    router.setParams({ query: input });
  }, 500);

  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
      <Input
        className='w-3/4'
        placeholder='Search'
        value={search}
        onChangeText={(input) => {
          setSearch(input);
          onChangeText(input);
        }}
      />
      {searchedUsers && <SearchedUsersList users={searchedUsers}/>}
      {!searchedUsers && <Text>Could not find any users. Try searching for something else?</Text>}
    </View>
  ) 
}