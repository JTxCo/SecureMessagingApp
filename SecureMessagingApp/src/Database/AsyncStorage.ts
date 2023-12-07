import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
}

export async function getData(key: string): Promise<string | undefined> {
    try{
        const value = await AsyncStorage.getItem(key);
        if(value !== null){
            return value;
        }
        return undefined
    }
    catch(e){
        console.log("error fetching data ", e);
    }
}

export async function updateData(key: string, update: object): Promise<void> {
    try {
      const item = await AsyncStorage.getItem(key);
      let data = item ? JSON.parse(item) : {};
      // Assuming the update object has the same structure
      const updatedData = {
        ...data,
        ...update,
      };
      await AsyncStorage.setItem(key, JSON.stringify(updatedData));
    } catch (e) {
      console.log('Error updating data', e);
    }
  }
  
