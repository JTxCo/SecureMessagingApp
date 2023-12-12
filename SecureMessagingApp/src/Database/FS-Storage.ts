import fs from 'fs';


export function FSsaveData(key: string, value: string): void {
    fs.writeFileSync(key, value);
}


export function FSgetData(key: string): string | undefined {
    try{
        const value = fs.readFileSync(key, 'utf8');
        if(value !== null){
            return JSON.parse(value);
        }
        return undefined
    }
    catch(e){
        console.log("error fetching data ", e);
    }
    return undefined;
}
export function FSdeleteUsername(): void {
    fs.unlinkSync('username');
}