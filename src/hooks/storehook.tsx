import React from 'react';
import { Filesystem, Directory } from '@capacitor/filesystem';

/**
 * A hook for storing and retrieving data from the electron-store.
 * @param key The key to store the data under.
 * @param defaultValue The default value to return if the key is not found.
 * @returns A tuple containing the value and a function to set the value.
 * @typeParam T The type of the store
 */
export function useStore<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const [value, setValue] = React.useState<T>(defaultValue);

    const setStoreValue = (value: T) => {
        setValue(value);
        Filesystem.writeFile({
            path: `data/${key}.json`,
            data: btoa(JSON.stringify(value)),
            directory: Directory.Data
        });
    }

    return [value, setStoreValue];
}
